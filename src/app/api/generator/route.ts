import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// Función auxiliar de choque (se mantiene igual)
function hayChoque(grupoA: any, grupoB: any): boolean {
    if (grupoA.ClvAsignatura === grupoB.ClvAsignatura) return true;
    for (const hA of grupoA.horarios) {
        for (const hB of grupoB.horarios) {
            if (hA.dia === hB.dia) {
                if (hA.inicio < hB.fin && hA.fin > hB.inicio) return true;
            }
        }
    }
    return false;
}

export async function POST(request: Request) {
    try {
        // AHORA RECIBIMOS: 
        // asignaturas: ['MAT01', 'PROG01'] (Claves de materia)
        // fijados: { 'MAT01': 10 } (Objeto: ClaveMateria -> IDGrupo)
        const { asignaturas, fijados } = await request.json();

        if (!asignaturas || asignaturas.length === 0) return NextResponse.json([]);

        // 1. Obtener TODOS los grupos disponibles para esas asignaturas
        const placeholders = asignaturas.map(() => '?').join(',');
        const sql = `
      SELECT 
        g.ClvGrupo, g.ClvAsignatura, a.NomAsignatura, p.NomProfesor,
        gh.Dia, gh.HoraEntrada, gh.HoraSalida, gh.Salon
      FROM GRUPOS g
      JOIN ASIGNATURAS a ON g.ClvAsignatura = a.ClvAsignatura
      JOIN PROFESORES p ON g.ClvProfesor = p.ClvProfesor
      JOIN GRUPOS_HORARIOS gh ON g.ClvGrupo = gh.ClvGrupo
      WHERE g.ClvAsignatura IN (${placeholders})
    `;

        const [rows]: any = await pool.query(sql, asignaturas);

        // 2. Estructurar
        const materiasMap = new Map();
        rows.forEach((row: any) => {
            if (!materiasMap.has(row.ClvAsignatura)) materiasMap.set(row.ClvAsignatura, new Map());
            const gruposDeMateria = materiasMap.get(row.ClvAsignatura);

            if (!gruposDeMateria.has(row.ClvGrupo)) {
                gruposDeMateria.set(row.ClvGrupo, {
                    id: row.ClvGrupo,
                    ClvAsignatura: row.ClvAsignatura,
                    materia: row.NomAsignatura,
                    profesor: row.NomProfesor,
                    horarios: []
                });
            }
            gruposDeMateria.get(row.ClvGrupo).horarios.push({
                dia: row.Dia, inicio: row.HoraEntrada, fin: row.HoraSalida, salon: row.Salon
            });
        });

        // 3. PREPARAR POOL DE GRUPOS (Aplicando lógica de FIJADOS)
        const poolGrupos: any[][] = [];

        // Recorremos las asignaturas solicitadas
        for (const clvAsig of asignaturas) {
            const gruposDisponiblesMap = materiasMap.get(clvAsig);
            if (!gruposDisponiblesMap) continue; // No hay oferta para esta materia

            const todosLosGrupos = Array.from(gruposDisponiblesMap.values());

            // ¿Esta materia tiene un grupo fijado?
            if (fijados && fijados[clvAsig]) {
                const idFijado = fijados[clvAsig];
                const grupoFijado = todosLosGrupos.find((g: any) => g.id === idFijado);

                if (grupoFijado) {
                    // SI ESTÁ FIJADO: El único candidato es ese grupo.
                    poolGrupos.push([grupoFijado]);
                } else {
                    // Error raro: Se fijó un grupo que no vino en la query
                    poolGrupos.push(todosLosGrupos);
                }
            } else {
                // SI NO ESTÁ FIJADO: Todos los grupos son candidatos
                poolGrupos.push(todosLosGrupos);
            }
        }

        // 4. GENERAR COMBINACIONES (Cartesiano)
        let combinaciones: any[] = [[]];
        for (const gruposDeUnaMateria of poolGrupos) {
            const nuevasCombinaciones = [];
            for (const combinacionActual of combinaciones) {
                for (const nuevoGrupo of gruposDeUnaMateria) {
                    let choca = false;
                    for (const grupoAgendado of combinacionActual) {
                        if (hayChoque(grupoAgendado, nuevoGrupo)) {
                            choca = true;
                            break;
                        }
                    }
                    if (!choca) nuevasCombinaciones.push([...combinacionActual, nuevoGrupo]);
                }
            }
            combinaciones = nuevasCombinaciones;
        }

        return NextResponse.json(combinaciones.slice(0, 50)); // Limitamos a 50
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}