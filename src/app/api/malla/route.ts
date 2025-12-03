import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const carrera = searchParams.get('carrera');

    if (!carrera) return NextResponse.json([], { status: 400 });

    try {
        // Traemos asignaturas de la malla + info extra (créditos, tipo)
        // LEFT JOIN con GRUPOS para saber si la materia tiene oferta abierta (opcional, visualmente útil)
        const sql = `
      SELECT 
        a.ClvAsignatura, 
        a.NomAsignatura, 
        a.Tipo, 
        m.Semestre,
        (SELECT COUNT(*) FROM GRUPOS g WHERE g.ClvAsignatura = a.ClvAsignatura) as GruposDisponibles
      FROM MALLA_CURRICULAR m
      JOIN ASIGNATURAS a ON m.ClvAsignatura = a.ClvAsignatura
      WHERE m.ClvCarrera = ?
      ORDER BY m.Semestre, a.NomAsignatura
    `;

        const [rows]: any = await pool.query(sql, [carrera]);

        // Organizamos la data para el Frontend
        const malla = {
            semestres: {} as Record<number, any[]>,
            optativas: [] as any[],
            libres: [] as any[]
        };

        rows.forEach((row: any) => {
            if (row.Tipo === 'Optativa') {
                malla.optativas.push(row);
            } else if (row.Tipo === 'Libre') {
                malla.libres.push(row);
            } else {
                // Obligatorias por semestre
                if (!malla.semestres[row.Semestre]) {
                    malla.semestres[row.Semestre] = [];
                }
                malla.semestres[row.Semestre].push(row);
            }
        });

        return NextResponse.json(malla);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}