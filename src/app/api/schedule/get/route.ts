import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Obtenemos el ID del usuario desde la URL (ej: ?idUsuario=1)
    const { searchParams } = new URL(request.url);
    const idUsuario = searchParams.get('idUsuario');

    if (!idUsuario) {
        return NextResponse.json({ message: 'Usuario no especificado' }, { status: 400 });
    }

    try {

        const [rows] = await pool.query(
            'SELECT * FROM V_HORARIO_ALUMNO WHERE ClvUsuario = ?',
            [idUsuario]
        );

        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al obtener horario' }, { status: 500 });
    }
}