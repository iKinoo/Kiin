import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Obtener Periodo Actual
        const [config]: any = await pool.query("SELECT Valor FROM CONFIGURACION WHERE Clave = 'PeriodoActual'");
        const periodoActual = config[0]?.Valor || 'Ago-Dic 2025';

        // 2. Consulta Filtrada
        const sql = `
      SELECT 
        g.ClvGrupo as id,
        g.ClvAsignatura as clave, -- Importante para el match
        a.NomAsignatura as materia,
        a.NumCreditos as creditos,
        p.NomProfesor as profesor,
        gh.Dia,
        gh.HoraEntrada as inicio,
        gh.HoraSalida as fin,
        gh.Salon as salon
      FROM GRUPOS g
      JOIN ASIGNATURAS a ON g.ClvAsignatura = a.ClvAsignatura
      JOIN PROFESORES p ON g.ClvProfesor = p.ClvProfesor
      JOIN GRUPOS_HORARIOS gh ON g.ClvGrupo = gh.ClvGrupo
      WHERE g.Periodo = ?  -- FILTRO CRÍTICO
      ORDER BY a.NomAsignatura, g.ClvGrupo, gh.Dia;
    `;

        const [rows]: any = await pool.query(sql, [periodoActual]);

        // Transformación (Agrupar horarios por grupo)
        const ofertaMap = new Map();

        rows.forEach((row: any) => {
            if (!ofertaMap.has(row.id)) {
                ofertaMap.set(row.id, {
                    id: row.id,
                    clave: row.clave, // Necesario para filtrar
                    materia: row.materia,
                    profesor: row.profesor,
                    creditos: row.creditos,
                    horarios: []
                });
            }
            ofertaMap.get(row.id).horarios.push({
                dia: row.Dia,
                inicio: row.inicio,
                fin: row.fin,
                salon: row.salon
            });
        });

        return NextResponse.json(Array.from(ofertaMap.values()));

    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}