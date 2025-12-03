import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { idUsuario, idGrupo } = await request.json();

        // Validación básica
        if (!idUsuario || !idGrupo) {
            return NextResponse.json({ message: 'Faltan datos (idUsuario o idGrupo)' }, { status: 400 });
        }

        await pool.query('CALL sp_guardar_materia(?, ?)', [idUsuario, idGrupo]);

        return NextResponse.json({ message: 'Materia guardada exitosamente' });

    } catch (error: any) {
        console.error('Error al guardar materia:', error);

        // Manejo de error cuando el SP falla (ej. grupo no existe)
        if (error.sqlState === '45000') {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        // Manejo de error por duplicado (Clave única compuesta violada)
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json({ message: 'Esta materia ya está en tu horario' }, { status: 409 });
        }

        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}