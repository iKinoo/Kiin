import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    try {
        const { idLista } = await request.json();
        await pool.query('DELETE FROM LISTAS_HORARIOS WHERE id_lista = ?', [idLista]);
        return NextResponse.json({ message: 'Eliminado' });
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}