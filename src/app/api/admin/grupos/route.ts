import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// 1. LEER (Con Filtros Avanzados y Tipo de Asignatura Optimizado)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo');
    const modalidad = searchParams.get('modalidad');
    const busqueda = searchParams.get('busqueda');
    const carrera = searchParams.get('carrera');
    const semestre = searchParams.get('semestre');

    try {
        // CORRECCIÓN BASADA EN TU SQL:
        // El campo 'Tipo' está en la tabla ASIGNATURAS (alias 'a'), no en la malla.
        // Esto hace la consulta mucho más rápida.
        let sql = `
          SELECT 
            g.ClvGrupo, g.Modalidad, g.Periodo, g.ClvProfesor, g.ClvAsignatura,
            a.NomAsignatura,
            a.Tipo as TipoAsignatura,  -- <-- Dato directo de ASIGNATURAS
            p.NomProfesor
          FROM GRUPOS g
          JOIN ASIGNATURAS a ON g.ClvAsignatura = a.ClvAsignatura
          JOIN PROFESORES p ON g.ClvProfesor = p.ClvProfesor
          WHERE 1=1
        `;

        const params = [];

        // Filtros existentes
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

        // Filtros de Malla (Carrera / Semestre)
        // Mantenemos el EXISTS porque es la forma correcta de filtrar sin duplicar filas
        if (carrera && carrera !== 'todos' && semestre && semestre !== 'todos') {
            sql += ' AND EXISTS (SELECT 1 FROM MALLA_CURRICULAR m WHERE m.ClvAsignatura = g.ClvAsignatura AND m.ClvCarrera = ? AND m.Semestre = ?)';
            params.push(carrera, semestre);
        } else if (carrera && carrera !== 'todos') {
            sql += ' AND EXISTS (SELECT 1 FROM MALLA_CURRICULAR m WHERE m.ClvAsignatura = g.ClvAsignatura AND m.ClvCarrera = ?)';
            params.push(carrera);
        } else if (semestre && semestre !== 'todos') {
            sql += ' AND EXISTS (SELECT 1 FROM MALLA_CURRICULAR m WHERE m.ClvAsignatura = g.ClvAsignatura AND m.Semestre = ?)';
            params.push(semestre);
        }

        sql += ' ORDER BY g.ClvGrupo DESC LIMIT 100';

        const [rows]: any = await pool.query(sql, params);

        // Cargar horarios
        if (rows.length > 0) {
            const ids = rows.map((r: any) => r.ClvGrupo);
            const placeholders = ids.map(() => '?').join(',');

            const [horarios]: any = await pool.query(
                `SELECT * FROM GRUPOS_HORARIOS WHERE ClvGrupo IN (${placeholders})`,
                ids
            );

            rows.forEach((row: any) => {
                row.horarios = horarios.filter((h: any) => h.ClvGrupo === row.ClvGrupo);
            });
        }

        return NextResponse.json(rows);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error interno' }, { status: 500 });
    }
}

// 2. CREAR (POST)
export async function POST(request: Request) {
    const connection = await pool.getConnection();
    try {
        const { profesor, asignatura, modalidad, periodo, horarios } = await request.json();

        await connection.beginTransaction();

        // Nota: Asumimos que ClvGrupo es AUTO_INCREMENT en tu tabla GRUPOS final
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
        console.error(error);
        return NextResponse.json({ message: 'Error al crear' }, { status: 500 });
    } finally {
        connection.release();
    }
}

// 3. EDITAR (PUT)
export async function PUT(request: Request) {
    const connection = await pool.getConnection();
    try {
        const { id, profesor, asignatura, modalidad, periodo, horarios } = await request.json();

        if (!id) return NextResponse.json({ message: 'ID requerido' }, { status: 400 });

        await connection.beginTransaction();

        await connection.query(
            'UPDATE GRUPOS SET ClvProfesor=?, ClvAsignatura=?, Modalidad=?, Periodo=? WHERE ClvGrupo=?',
            [profesor, asignatura, modalidad, periodo, id]
        );

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

        if (ids && ids.length > 0) {
            const placeholders = ids.map(() => '?').join(',');
            sql = `DELETE FROM GRUPOS WHERE ClvGrupo IN (${placeholders})`;
            params = ids;
        }
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
        return NextResponse.json({ message: 'Error al eliminar' }, { status: 500 });
    }
}