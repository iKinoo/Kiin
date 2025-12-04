import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const carrera = searchParams.get('carrera'); // Ej: 'LIS'

    if (!carrera) return NextResponse.json([], { status: 400 });

    try {
        // 1. Obtener Periodo Actual y Número de Semestres de la Carrera
        const [config]: any = await pool.query("SELECT Valor FROM CONFIGURACION WHERE Clave = 'PeriodoActual'");
        const periodoActual = config[0]?.Valor || 'Ago-Dic 2025';

        const [infoCarrera]: any = await pool.query("SELECT NumSemestres FROM CARRERA WHERE ClvCarrera = ?", [carrera]);
        const numSemestres = infoCarrera[0]?.NumSemestres || 9;

        // 2. Traer Malla + Disponibilidad en Periodo Actual
        // Hacemos LEFT JOIN con GRUPOS filtrando por el periodo actual.
        // Si 'GruposDisponibles' > 0, es que hay oferta.
        const sql = `
      SELECT 
        m.Semestre,
        a.ClvAsignatura, 
        a.NomAsignatura, 
        a.Tipo, 
        (
            SELECT COUNT(*) 
            FROM GRUPOS g 
            WHERE g.ClvAsignatura = a.ClvAsignatura 
            AND g.Periodo = ? 
        ) as GruposDisponibles
      FROM MALLA_CURRICULAR m
      JOIN ASIGNATURAS a ON m.ClvAsignatura = a.ClvAsignatura
      WHERE m.ClvCarrera = ?
      ORDER BY m.Semestre, a.NomAsignatura
    `;

        const [rows]: any = await pool.query(sql, [periodoActual, carrera]);

        // 3. Estructurar respuesta
        // Inicializamos todos los semestres vacíos para garantizar que aparezcan del 1 al N
        const malla: any = {
            semestres: {},
            optativas: [],
            libres: []
        };

        for (let i = 1; i <= numSemestres; i++) {
            malla.semestres[i] = [];
        }

        rows.forEach((row: any) => {
            // Separar por tipo
            if (row.Tipo === 'Optativa') {
                malla.optativas.push(row);
            } else if (row.Tipo === 'Libre') {
                malla.libres.push(row);
            } else {
                // Asignar a su semestre correspondiente (si existe en el rango)
                if (malla.semestres[row.Semestre]) {
                    malla.semestres[row.Semestre].push(row);
                }
            }
        });

        return NextResponse.json({
            periodo: periodoActual,
            estructura: malla
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}