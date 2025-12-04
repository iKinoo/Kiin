import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

// CONFIGURACIÓN
const ARCHIVO_CSV = 'Horarios_Enero_Mayo_2026_difusion_3Diciembre2025.csv';
const PERIODO_VIGENTE = 'Ene-Jun 2026';
const OUTPUT_FILE = 'oferta_completa.sql';

// Mapeo de columnas
const COLUMNAS_DIAS = [
    { dia: 'Lunes', colHora: 'Lunes', colAula: 'Aula1' },
    { dia: 'Martes', colHora: 'Martes', colAula: 'Aula2' },
    { dia: 'Miercoles', colHora: 'Miércoles', colAula: 'Aula3' },
    { dia: 'Jueves', colHora: 'Jueves', colAula: 'Aula4' },
    { dia: 'Viernes', colHora: 'Viernes', colAula: 'Aula5' },
    { dia: 'Sabado', colHora: 'Sábado', colAula: 'Aula6' },
];

// Función para escapar strings SQL y arreglar caracteres rotos comunes si persisten
const sqlStr = (str: any) => {
    if (!str) return 'NULL';
    let s = String(str).trim();
    // Escapar comillas simples
    s = s.replace(/'/g, "''");
    return `'${s}'`;
};

async function main() {
    console.log(`📝 Generando script SQL maestro...`);

    // 1. LEER CSV con Codepage Forzado (UTF-8)
    const csvPath = path.join(process.cwd(), ARCHIVO_CSV);

    // Leemos el archivo como buffer primero para asegurar integridad
    const buffer = fs.readFileSync(csvPath);
    const workbook = XLSX.read(buffer, { type: 'buffer', codepage: 65001 }); // 65001 = UTF-8
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let rawData: any[] = XLSX.utils.sheet_to_json(sheet);

    // Normalizar llaves del JSON (Quitar espacios " Asignatura" -> "Asignatura")
    rawData = rawData.map(row => {
        const newRow: any = {};
        Object.keys(row).forEach(key => newRow[key.trim()] = row[key]);
        return newRow;
    });

    console.log(`📊 Datos cargados: ${rawData.length} filas.`);

    // 2. PREPARAR EL ARCHIVO DE SALIDA (UTF-8)
    const stream = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });

    // ENCABEZADOS CRÍTICOS
    stream.write(`-- SCRIPT DE CARGA DE OFERTA ACADÉMICA\n`);
    stream.write(`-- Generado automáticamente\n\n`);

    stream.write(`USE kiin_db;\n`);
    stream.write(`SET NAMES 'utf8mb4';\n`); // ¡ESTO ARREGLA LOS CARACTERES RAROS EN MYSQL!
    stream.write(`SET FOREIGN_KEY_CHECKS = 0;\n\n`);

    // 3. LIMPIEZA (TRUNCATE)
    stream.write(`-- [1] LIMPIEZA DE TABLAS\n`);
    const tablas = ['GRUPOS_HORARIOS', 'DETALLE_LISTA', 'LISTAS_HORARIOS', 'GRUPOS', 'MALLA_CURRICULAR', 'ASIGNATURAS', 'PROFESORES'];
    tablas.forEach(t => stream.write(`TRUNCATE TABLE ${t};\n`));
    stream.write(`\n`);

    // 4. CARRERAS BASE
    stream.write(`-- [2] CARRERAS BASE\n`);
    stream.write(`INSERT IGNORE INTO CARRERA (ClvCarrera, NomCarrera, NumSemestres) VALUES 
('LIS', 'Licenciatura en Ingeniería de Software', 9),
('LCC', 'Licenciatura en Ciencias de la Computación', 9),
('LIC', 'Licenciatura en Ingeniería de la Computación', 9),
('LA', 'Licenciatura en Actuaría', 9),
('LM', 'Licenciatura en Matemáticas', 9),
('LEM', 'Licenciatura en Enseñanza de las Matemáticas', 9);\n\n`);

    // 5. PROCESAMIENTO EN MEMORIA (FASE 1 y 2: Catálogos)
    console.log(`🧠 Procesando catálogos en memoria...`);

    const mapaAsignaturas = new Map<string, number>(); // Nombre -> ID
    const mapaProfesores = new Map<string, number>();  // Nombre -> ID
    let idAsignatura = 1;
    let idProfesor = 1;

    rawData.forEach(row => {
        const nombreAsig = String(row['Asignatura'] || '').trim();
        const nombreProfe = `${row['NOMBRE(S)'] || ''} ${row['APELLIDOS'] || ''}`.trim() || 'Por Asignar';

        if (nombreAsig && !mapaAsignaturas.has(nombreAsig)) {
            mapaAsignaturas.set(nombreAsig, idAsignatura++);
        }
        if (!mapaProfesores.has(nombreProfe)) {
            mapaProfesores.set(nombreProfe, idProfesor++);
        }
    });

    // ESCRIBIR PROFESORES
    stream.write(`-- [3] PROFESORES (${mapaProfesores.size})\n`);
    stream.write(`INSERT INTO PROFESORES (ClvProfesor, NomProfesor) VALUES\n`);
    let count = 0;
    for (const [nombre, id] of mapaProfesores) {
        const sep = count === mapaProfesores.size - 1 ? ';' : ',';
        stream.write(`(${id}, ${sqlStr(nombre)})${sep}\n`);
        count++;
    }
    stream.write(`\n`);

    // ESCRIBIR ASIGNATURAS
    stream.write(`-- [4] ASIGNATURAS (${mapaAsignaturas.size})\n`);
    stream.write(`INSERT INTO ASIGNATURAS (ClvAsignatura, NomAsignatura, NumCreditos, Tipo) VALUES\n`);
    count = 0;
    for (const [nombre, id] of mapaAsignaturas) {
        // Buscamos datos extra del primer registro que tenga este nombre
        const row = rawData.find(r => String(r['Asignatura'] || '').trim() === nombre);
        const creditos = parseInt(row['Créditos']) || 8;
        const tipo = String(row['Tipo'] || 'Obligatoria').trim();

        const sep = count === mapaAsignaturas.size - 1 ? ';' : ',';
        stream.write(`('${id}', ${sqlStr(nombre)}, ${creditos}, ${sqlStr(tipo)})${sep}\n`);
        count++;
    }
    stream.write(`\n`);

    // 6. PROCESAMIENTO GRUPOS Y HORARIOS
    console.log(`🧠 Generando grupos y horarios...`);
    stream.write(`-- [5] GRUPOS Y HORARIOS\n`);

    let idGrupo = 1;
    const insertsMalla = new Set<string>(); // Para evitar duplicados en SQL

    for (const row of rawData) {
        const nombreAsig = String(row['Asignatura'] || '').trim();
        const nombreProfe = `${row['NOMBRE(S)'] || ''} ${row['APELLIDOS'] || ''}`.trim() || 'Por Asignar';

        if (!nombreAsig) continue;

        const clvAsig = mapaAsignaturas.get(nombreAsig);
        const clvProfe = mapaProfesores.get(nombreProfe);

        // Modalidad
        let modalidad = 'Regular';
        const modRaw = String(row['Modalidad'] || '').toLowerCase();
        if (modRaw.includes('ordinario') && modRaw.includes('recursamiento')) modalidad = 'Ordinario/Recursamiento';
        else if (modRaw.includes('regular') && modRaw.includes('acompañamiento')) modalidad = 'Regular/Acompañamiento';
        else if (modRaw.includes('recursamiento') && modRaw.includes('acompañamiento')) modalidad = 'Recursamiento/Acompañamiento';
        else if (modRaw.includes('acompañamiento')) modalidad = 'Acompañamiento';
        else if (modRaw.includes('recursamiento')) modalidad = 'Recursamiento';
        else if (modRaw.includes('ordinario')) modalidad = 'Ordinario';
        else if (modRaw.includes('virtual')) modalidad = 'Virtual';

        // INSERT GRUPO
        stream.write(`INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (${idGrupo}, ${clvProfe}, '${clvAsig}', '${modalidad}', '${PERIODO_VIGENTE}');\n`);

        // INSERT HORARIOS
        for (const diaConfig of COLUMNAS_DIAS) {
            const horaRaw = String(row[diaConfig.colHora] || '');
            const salon = String(row[diaConfig.colAula] || 'Sin Aula');

            if (horaRaw.includes('-')) {
                const partes = horaRaw.split('-').map(s => s.trim());
                if (partes.length === 2) {
                    let entrada = partes[0].length === 5 ? partes[0] + ':00' : partes[0];
                    let salida = partes[1].length === 5 ? partes[1] + ':00' : partes[1];

                    // Ajuste dia para ENUM
                    let diaDb = diaConfig.dia;
                    if (diaDb === 'Miercoles') diaDb = 'Miercoles';

                    if (entrada.includes(':')) {
                        stream.write(`INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (${idGrupo}, '${diaDb}', ${sqlStr(salon)}, '${entrada}', '${salida}');\n`);
                    }
                }
            }
        }

        // RECOLECTAR MALLA
        const semestre = parseInt(row['SEMESTRE']) || 0;

        const checkMalla = (carrera: string, col: string) => {
            const val = String(row[col] || '').trim();
            if (val && val !== '0' && val !== '-' && val !== '') {
                insertsMalla.add(`INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('${carrera}', '${clvAsig}', ${semestre});`);
            }
        };

        checkMalla('LIS', 'LIS MEFI');
        checkMalla('LCC', 'LCC MEFI');
        checkMalla('LIC', 'LIC MEFI');
        checkMalla('LA', 'LA MEFI');
        checkMalla('LEM', 'LEM MEFI');
        checkMalla('LM', 'LM cupo');

        idGrupo++;
    }

    // ESCRIBIR MALLA
    stream.write(`\n-- [6] MALLA CURRICULAR (${insertsMalla.size})\n`);
    insertsMalla.forEach(sql => stream.write(sql + '\n'));

    // CONFIGURACIÓN
    stream.write(`\n-- [7] CONFIGURACIÓN\n`);
    stream.write(`INSERT IGNORE INTO CONFIGURACION (Clave, Valor) VALUES ('PeriodoActual', '${PERIODO_VIGENTE}');\n`);
    stream.write(`UPDATE CONFIGURACION SET Valor = '${PERIODO_VIGENTE}' WHERE Clave = 'PeriodoActual';\n`);

    stream.write(`\nSET FOREIGN_KEY_CHECKS = 1;\n`);
    stream.end();

    console.log(`✅ Archivo generado: ${OUTPUT_FILE}`);
    console.log(`   Listo para importar en MySQL Workbench / phpMyAdmin.`);
}

main();