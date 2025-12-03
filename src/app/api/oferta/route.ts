import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Consulta Maestra: Trae Grupos + Horarios + Profesores + Asignaturas
        const sql = `
      SELECT 
        g.ClvGrupo,
        a.NomAsignatura,
        a.NumCreditos,
        p.NomProfesor,
        gh.Dia,
        gh.HoraEntrada,
        gh.HoraSalida,
        gh.Salon
      FROM GRUPOS g
      JOIN ASIGNATURAS a ON g.ClvAsignatura = a.ClvAsignatura
      JOIN PROFESORES p ON g.ClvProfesor = p.ClvProfesor
      JOIN GRUPOS_HORARIOS gh ON g.ClvGrupo = gh.ClvGrupo
      ORDER BY a.NomAsignatura, g.ClvGrupo, gh.Dia;
    `;

        const [rows]: any = await pool.query(sql);

        // TRANSFORMACIÓN DE DATOS (Backend Logic)
        // MySQL devuelve filas planas (una por cada día de clase).
        // Vamos a agruparlas por "Grupo" para enviar objetos limpios al front.

        const ofertaMap = new Map();

        rows.forEach((row: any) => {
            // Si el grupo no existe en el mapa, lo inicializamos
            if (!ofertaMap.has(row.ClvGrupo)) {
                ofertaMap.set(row.ClvGrupo, {
                    id: row.ClvGrupo,
                    materia: row.NomAsignatura,
                    profesor: row.NomProfesor,
                    creditos: row.NumCreditos,
                    horarios: [] // Array donde meteremos los días
                });
            }

            // Agregamos el horario específico (Ej: Lunes 7-9)
            ofertaMap.get(row.ClvGrupo).horarios.push({
                dia: row.Dia,
                inicio: row.HoraEntrada, // Formato HH:MM:SS
                fin: row.HoraSalida,
                salon: row.Salon
            });
        });

        // Convertimos el Mapa a un Array JSON
        const data = Array.from(ofertaMap.values());

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error obteniendo oferta:', error);
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}