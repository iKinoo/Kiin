import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const idUsuario = searchParams.get('idUsuario');

    if (!idUsuario) return NextResponse.json([], { status: 400 });

    try {
        // 1. Obtener las listas (encabezados)
        const [listas]: any = await pool.query(
            'SELECT * FROM LISTAS_HORARIOS WHERE ClvUsuario = ? ORDER BY FechaCreacion DESC',
            [idUsuario]
        );

        // 2. Para cada lista, obtener los detalles (materias)
        // Esto podría optimizarse con un JSON_ARRAYAGG en SQL moderno, pero haremos un loop simple
        // para asegurar compatibilidad.
        const resultados = [];

        for (const lista of listas) {
            const sqlDetalle = `
        SELECT a.NomAsignatura, gh.Dia, gh.HoraEntrada, gh.HoraSalida, gh.Salon
        FROM DETALLE_LISTA dl
        JOIN GRUPOS g ON dl.ClvGrupo = g.ClvGrupo
        JOIN ASIGNATURAS a ON g.ClvAsignatura = a.ClvAsignatura
        JOIN GRUPOS_HORARIOS gh ON g.ClvGrupo = gh.ClvGrupo
        WHERE dl.id_lista = ?
      `;
            const [detalles]: any = await pool.query(sqlDetalle, [lista.id_lista]);

            resultados.push({
                id: lista.id_lista,
                alias: lista.Alias,
                fecha: lista.FechaCreacion,
                materias: detalles
            });
        }

        return NextResponse.json(resultados);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}