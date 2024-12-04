import { NextApiRequest, NextApiResponse } from 'next';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

/**
 * Clase para el mapeo de filas desde csv
 * Tener cuidado con la ruta y el formato del archivo
 */

type CourseCSV = {
  [key: string]: string; // Ajusta los tipos según las columnas del CSV
};

/**
 * funcion que maneja las peticiones al servidor
 * @param req solicitud a ejecutar
 * @param res respuesta a devolver
 * @returns codigo de exito o error (standar http)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'src/infrastructure/datasource/data/data.csv');
  const results: CourseCSV[] = [];

  if (results.length > 0) {
    return res.status(200).json(results);

  }

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => res.status(200).json(results))
    .on('error', (error) => res.status(500).json({ error: error.message }));
}
