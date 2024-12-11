import { CourseCSV } from "@/infrastructure/models/CourseModel";
import csvParser from "csv-parser";
import fs from 'fs';


export class CoursesModelDao {
  private static _results: CourseCSV[] = [];

  static async getCourses(): Promise<CourseCSV[]> {
    if (this._results.length > 0) {
      return this._results;
    }

    const filePath = 'src/pages/api/data/data.csv'; // Ruta del archivo
    this._results = await readCSV(filePath);
    return this._results;
  }
}

const readCSV = async (filePath: string): Promise<CourseCSV[]> => {
  return new Promise((resolve, reject) => {
    const results: CourseCSV[] = [];

    fs.createReadStream(filePath) // Leer el archivo CSV
      .pipe(csvParser()) // Pasarlo a través del parser
      .on('data', (data) => results.push(data)) // Procesar cada fila
      .on('end', () => resolve(results)) // Resolver al finalizar
      .on('error', (error) => reject(error)); // Manejar errores
  });
};
