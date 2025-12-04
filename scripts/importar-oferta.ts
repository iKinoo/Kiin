import dotenv from 'dotenv';
import { createRequire } from 'module';
import * as mysql from 'mysql2/promise';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

dotenv.config({ path: '.env.local' });

const PERIODO_VIGENTE = 'Ene-Jun 2026';
// IMPORTANTE: Asegúrate de que este nombre sea EXACTO al de tu archivo en la carpeta raíz
const ARCHIVO_CSV = 'Horarios_Enero_Mayo_2026_difusion_3Diciembre2025.csv';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kiin_db',
};

const COLUMNAS_DIAS = [
    { dia: 'Lunes', colHora: 'Lunes', colAula: 'Aula1' },
    { dia: 'Martes', colHora: 'Martes', colAula: 'Aula2' },
    { dia: 'Miercoles', colHora: 'Miércoles', colAula: 'Aula3' },
    { dia: 'Jueves', colHora: 'Jueves', colAula: 'Aula4' },
    { dia: 'Viernes', colHora: 'Viernes', colAula: 'Aula5' },
    { dia: 'Sabado', colHora: 'Sábado', colAula: 'Aula6' },
];

async function main() {
    console.log('🚀 INICIANDO MIGRACIÓN DESDE CSV...');

    let connection: mysql.Connection | undefined;

    try {
        connection = await mysql.createConnection(dbConfig);

        // 1. LEER CSV
        const csvPath = path.join(process.cwd(), ARCHIVO_CSV);
        console.log(`📂 Leyendo archivo: ${ARCHIVO_CSV}`);

        // Usamos xlsx para leer CSV (es robusto y maneja codificaciones)
        const workbook = XLSX.readFile(csvPath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData: any[] = XLSX.utils.sheet_to_json(sheet);
        console.log(`📊 Filas encontradas: ${rawData.length}`);

        if (rawData.length === 0) {
            console.error("❌ El archivo parece estar vacío o no se pudo leer.");
            process.exit(1);
        }

        // ==========================================
        // FASE 1: CATALOGAR MATERIAS ÚNICAS (Por Nombre)
        // ==========================================
        console.log('🔹 FASE 1: Creando catálogo de asignaturas...');

        // Mapa: "Nombre Asignatura" -> "ID Limpio"
        const mapaAsignaturas = new Map<string, string>();
        let contadorAsignatura = 1;

        for (const row of rawData) {
            // Limpiamos nombre (quitamos espacios y aseguramos string)
            const nombreRaw = String(row['Asignatura'] || '').trim();

            // Datos adicionales (tomamos el primero que encontremos para esta materia)
            const creditos = parseInt(row['Créditos']) || 8;
            const tipo = String(row['Tipo'] || 'Obligatoria').trim();

            if (!nombreRaw) continue;

            // Si es una materia nueva (no está en el mapa), la registramos
            if (!mapaAsignaturas.has(nombreRaw)) {
                const idLimpio = String(contadorAsignatura++);

                await connection.query(
                    'INSERT INTO ASIGNATURAS (ClvAsignatura, NomAsignatura, NumCreditos, Tipo) VALUES (?, ?, ?, ?)',
                    [idLimpio, nombreRaw, creditos, tipo]
                );

                mapaAsignaturas.set(nombreRaw, idLimpio);
            }
        }
        console.log(`✅ Asignaturas únicas registradas: ${mapaAsignaturas.size}`);


        // ==========================================
        // FASE 2: CATALOGAR PROFESORES ÚNICOS
        // ==========================================
        console.log('🔹 FASE 2: Registrando profesores...');

        const mapaProfesores = new Map<string, number>(); // Nombre -> ID (BD)

        for (const row of rawData) {
            const nombre = String(row['NOMBRE(S)'] || '').trim();
            const apellidos = String(row['APELLIDOS'] || '').trim();
            let nombreCompleto = `${nombre} ${apellidos}`.trim();

            if (!nombreCompleto) nombreCompleto = 'Profesor Por Asignar';

            if (!mapaProfesores.has(nombreCompleto)) {
                const [res]: any = await connection.query('INSERT INTO PROFESORES (NomProfesor) VALUES (?)', [nombreCompleto]);
                mapaProfesores.set(nombreCompleto, res.insertId);
            }
        }
        console.log(`✅ Profesores registrados: ${mapaProfesores.size}`);


        // ==========================================
        // FASE 3: CREAR GRUPOS Y VINCULAR TODO
        // ==========================================
        console.log('🔹 FASE 3: Creando grupos, horarios y malla...');

        let contadorGrupos = 0;

        for (const row of rawData) {
            // Recuperar IDs usando los nombres como clave
            const nombreAsignatura = String(row['Asignatura'] || '').trim();
            const nombreProfesor = `${row['NOMBRE(S)'] || ''} ${row['APELLIDOS'] || ''}`.trim() || 'Profesor Por Asignar';

            const clvAsignatura = mapaAsignaturas.get(nombreAsignatura);
            const idProfesor = mapaProfesores.get(nombreProfesor);

            if (!clvAsignatura || !idProfesor) continue;

            // A. INSERTAR GRUPO
            let modalidad = 'Regular';
            const modRaw = String(row['Modalidad'] || '').toLowerCase();

            if (modRaw.includes('acompañamiento') && modRaw.includes('regular')) modalidad = 'Regular/Acompañamiento';
            else if (modRaw.includes('acompañamiento')) modalidad = 'Acompañamiento';
            else if (modRaw.includes('ordinario')) modalidad = 'Ordinario';
            else if (modRaw.includes('recursamiento')) modalidad = 'Recursamiento';
            else if (modRaw.includes('virtual')) modalidad = 'Virtual';

            const [resG]: any = await connection.query(
                'INSERT INTO GRUPOS (ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (?, ?, ?, ?)',
                [idProfesor, clvAsignatura, modalidad, PERIODO_VIGENTE]
            );
            const idGrupo = resG.insertId;
            contadorGrupos++;

            // B. INSERTAR HORARIOS
            for (const diaConfig of COLUMNAS_DIAS) {
                const horaRaw = String(row[diaConfig.colHora] || '');
                const salon = String(row[diaConfig.colAula] || 'Sin Aula');

                // Detectar rangos tipo "17:00 - 18:30"
                if (horaRaw.includes('-')) {
                    const partes = horaRaw.split('-').map(s => s.trim());
                    if (partes.length === 2) {
                        // Normalizar formato de hora
                        const entrada = partes[0].length === 5 ? partes[0] + ':00' : partes[0];
                        const salida = partes[1].length === 5 ? partes[1] + ':00' : partes[1];

                        // Solo insertar si parece una hora válida
                        if (entrada.includes(':') && salida.includes(':')) {
                            await connection.query(
                                'INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (?, ?, ?, ?, ?)',
                                [idGrupo, diaConfig.dia, salon, entrada, salida]
                            );
                        }
                    }
                }
            }

            // C. INSERTAR EN MALLA CURRICULAR
            const semestre = parseInt(row['SEMESTRE']) || 0;

            const insertarMalla = async (carrera: string, columnaExcel: string) => {
                const val = String(row[columnaExcel] || '').trim();
                // Si la celda tiene contenido (número de cupo, 'x', etc), pertenece a esta carrera
                if (val && val !== '0' && val !== '-') {
                    // Usamos IGNORE para no duplicar la relación Materia-Carrera
                    if (connection) {
                        await connection.query(
                            'INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES (?, ?, ?)',
                            [carrera, clvAsignatura, semestre]
                        );
                    }
                }
            };

            // Mapeo exacto según encabezados del CSV
            await insertarMalla('LIS', 'LIS MEFI');
            await insertarMalla('LCC', 'LCC MEFI');
            await insertarMalla('LIC', 'LIC MEFI');
            await insertarMalla('LA', 'LA MEFI');
            await insertarMalla('LEM', 'LEM MEFI');
            await insertarMalla('LM', 'LM cupo');
        }

        console.log(`✅ ¡IMPORTACIÓN FINALIZADA!`);
        console.log(`   Grupos creados: ${contadorGrupos}`);

        // Configuración Final
        await connection.query("INSERT IGNORE INTO CONFIGURACION (Clave, Valor) VALUES ('PeriodoActual', ?)", [PERIODO_VIGENTE]);
        await connection.query("UPDATE CONFIGURACION SET Valor = ? WHERE Clave = 'PeriodoActual'", [PERIODO_VIGENTE]);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

main();