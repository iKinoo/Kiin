import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// 1. LEER (Con Horarios y Filtros)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo');
    const modalidad = searchParams.get('modalidad');
    const busqueda = searchParams.get('busqueda');

    try {
        let sql = `
      SELECT 
        g.ClvGrupo, g.Modalidad, g.Periodo, g.ClvProfesor, g.ClvAsignatura,
        a.NomAsignatura,
        p.NomProfesor
      FROM GRUPOS g
      JOIN ASIGNATURAS a ON g.ClvAsignatura = a.ClvAsignatura
      JOIN PROFESORES p ON g.ClvProfesor = p.ClvProfesor
      WHERE 1=1
    `;

        const params = [];

        if (periodo && periodo !== 'todos') {
            sql += ' AND g.Periodo = ?';
            params.push(periodo);
        }
        if (modalidad && modalidad !== 'todos') {
            sql += ' AND g.Modalidad = ?';
            params.push(modalidad);
        }
        if (busqueda) {
            sql += ' AND (a.NomAsignatura LIKE ? OR p.NomProfesor LIKE ?)';
            params.push(`%${busqueda}%`, `%${busqueda}%`);
        }

        sql += ' ORDER BY g.ClvGrupo DESC LIMIT 100';

        const [rows]: any = await pool.query(sql, params);

        // Cargar horarios para estos grupos
        if (rows.length > 0) {
            const ids = rows.map((r: any) => r.ClvGrupo);
            const placeholders = ids.map(() => '?').join(',');

            const [horarios]: any = await pool.query(
                `SELECT * FROM GRUPOS_HORARIOS WHERE ClvGrupo IN (${placeholders})`,
                ids
            );

            // Unir horarios al grupo correspondiente
            rows.forEach((row: any) => {
                row.horarios = horarios.filter((h: any) => h.ClvGrupo === row.ClvGrupo);
            });
        }

        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json({ message: 'Error interno' }, { status: 500 });
    }
}

// 2. CREAR (POST)
export async function POST(request: Request) {
    const connection = await pool.getConnection();
    try {
        const { profesor, asignatura, modalidad, periodo, horarios } = await request.json();

        await connection.beginTransaction();

        const [res]: any = await connection.query(
            'INSERT INTO GRUPOS (ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (?, ?, ?, ?)',
            [profesor, asignatura, modalidad, periodo]
        );

        const idGrupo = res.insertId;

        if (horarios && horarios.length > 0) {
            const values = horarios.map((h: any) => [idGrupo, h.Dia, h.Salon, h.HoraEntrada, h.HoraSalida]);
            await connection.query(
                'INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES ?',
                [values]
            );
        }

        await connection.commit();
        return NextResponse.json({ message: 'Grupo creado', id: idGrupo });
    } catch (error) {
        await connection.rollback();
        return NextResponse.json({ message: 'Error al crear' }, { status: 500 });
    } finally {
        connection.release();
    }
}

// 3. EDITAR (PUT) - Con Horarios
export async function PUT(request: Request) {
    const connection = await pool.getConnection();
    try {
        const { id, profesor, asignatura, modalidad, periodo, horarios } = await request.json();

        if (!id) return NextResponse.json({ message: 'ID requerido' }, { status: 400 });

        await connection.beginTransaction();

        // 1. Actualizar Datos Generales
        await connection.query(
            'UPDATE GRUPOS SET ClvProfesor=?, ClvAsignatura=?, Modalidad=?, Periodo=? WHERE ClvGrupo=?',
            [profesor, asignatura, modalidad, periodo, id]
        );

        // 2. Actualizar Horarios (Estrategia: Borrar todo y volver a insertar)
        await connection.query('DELETE FROM GRUPOS_HORARIOS WHERE ClvGrupo = ?', [id]);

        if (horarios && horarios.length > 0) {
            const values = horarios.map((h: any) => [id, h.Dia, h.Salon, h.HoraEntrada, h.HoraSalida]);
            await connection.query(
                'INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES ?',
                [values]
            );
        }

        await connection.commit();
        return NextResponse.json({ message: 'Grupo actualizado correctamente' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        return NextResponse.json({ message: 'Error al actualizar' }, { status: 500 });
    } finally {
        connection.release();
    }
}

// 4. ELIMINAR (DELETE)
export async function DELETE(request: Request) {
    try {
        const { tipo, id, ids, periodo } = await request.json();

        let sql = '';
        let params: any[] = [];

        // Lógica Masiva vs Individual
        if (ids && ids.length > 0) {
            const placeholders = ids.map(() => '?').join(',');
            sql = `DELETE FROM GRUPOS WHERE ClvGrupo IN (${placeholders})`;
            params = ids;
        }
        // Lógica por Tipo
        else if (tipo === 'grupo') {
            sql = 'DELETE FROM GRUPOS WHERE ClvGrupo = ?';
            params = [id];
        } else if (tipo === 'profesor') {
            sql = 'DELETE FROM GRUPOS WHERE ClvProfesor = ? AND Periodo = ?';
            params = [id, periodo];
        } else if (tipo === 'asignatura') {
            sql = 'DELETE FROM GRUPOS WHERE ClvAsignatura = ? AND Periodo = ?';
            params = [id, periodo];
        }

        if (!sql) return NextResponse.json({ message: 'Acción no válida' }, { status: 400 });

        const [res]: any = await pool.query(sql, params);
        return NextResponse.json({ message: `Registros eliminados: ${res.affectedRows}` });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al eliminar' }, { status: 500 });
    }
}