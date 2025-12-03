import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Obtenemos una conexión del pool para manejar transacciones
    const connection = await pool.getConnection();

    try {

        const { idUsuario, alias, grupos } = await request.json();

        // VALIDACIÓN NUEVA: Verificar duplicado de nombre
        const [existentes]: any = await pool.query(
            'SELECT id_lista FROM LISTAS_HORARIOS WHERE ClvUsuario = ? AND Alias = ?',
            [idUsuario, alias]
        );

        if (existentes.length > 0) {
            return NextResponse.json({ message: 'Ya tienes un horario guardado con ese nombre.' }, { status: 409 });
        }


        if (!idUsuario || !alias || !grupos || grupos.length === 0) {
            return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
        }

        // 1. Iniciar Transacción
        await connection.beginTransaction();

        // 2. Insertar el Encabezado (Nombre de la lista)
        const [resHeader]: any = await connection.query(
            'INSERT INTO LISTAS_HORARIOS (ClvUsuario, Alias) VALUES (?, ?)',
            [idUsuario, alias]
        );

        const idLista = resHeader.insertId;

        // 3. Insertar los Detalles (Las materias)
        // Preparamos los valores para inserción masiva: [[idLista, idGrupo1], [idLista, idGrupo2]...]
        const valores = grupos.map((idGrupo: number) => [idLista, idGrupo]);

        await connection.query(
            'INSERT INTO DETALLE_LISTA (id_lista, ClvGrupo) VALUES ?',
            [valores]
        );

        // 4. Confirmar Transacción
        await connection.commit();

        return NextResponse.json({ message: 'Horario guardado correctamente', idLista });

    } catch (error) {
        // Si algo falla, deshacer todo
        await connection.rollback();
        console.error('Error guardando lista:', error);
        return NextResponse.json({ message: 'Error al guardar la lista' }, { status: 500 });
    } finally {
        // Liberar la conexión
        connection.release();
    }
}