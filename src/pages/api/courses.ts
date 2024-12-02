import { NextApiRequest, NextApiResponse } from 'next';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

type CourseCSV = {
  [key: string]: string; // Ajusta los tipos según las columnas de tu CSV
};

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
