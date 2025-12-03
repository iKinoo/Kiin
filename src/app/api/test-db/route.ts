import pool from '@/lib/db'; // Importamos la conexión que creamos
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Consulta de prueba a la tabla CARRERA que llenamos con el script
        const [rows] = await pool.query('SELECT * FROM CARRERA');

        // Devolvemos los datos en formato JSON
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Error conectando a la base de datos', error },
            { status: 500 }
        );
    }
}