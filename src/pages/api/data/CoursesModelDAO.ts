import csvParser from "csv-parser";
import { CourseCSV } from "./CourseModel";
import { Readable } from "stream";
import fs from "fs";


export class CoursesModelDao {
  private static _results: CourseCSV[] = [];

  static async getCourses(): Promise<CourseCSV[]> {
    if (this._results.length > 0) {
      return this._results;
    }

    const localDev = true;

    if (localDev) {
      const url = 'public/data.csv'
      this._results = await readLocalCSV(url);
    }
    else {
      const url = 'https://kiin-rho.vercel.app/data.csv';
      this._results = await readCSV(url);
    }

    return this._results;
  }
}

const readCSV = async (url: string): Promise<CourseCSV[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        return reject(new Error(`Failed to fetch CSV file: ${response.statusText}`));
      }

      const csvText = await response.text(); // Obtener el contenido del archivo CSV como texto

      const results: CourseCSV[] = [];


      // Usar un stream legible para procesar el texto del CSV

      const readableStream = Readable.from(csvText);

      readableStream
        .pipe(csvParser())
        .on('data', (data) => results.push(data)) // Procesar cada fila
        .on('end', () => resolve(results)) // Resolver al finalizar
        .on('error', (error) => reject(error)); // Manejar errores
    } catch (error) {
      reject(error); // Manejar cualquier error de fetch o de otro tipo
    }
  });
};


const readLocalCSV = (filePath: string): Promise<CourseCSV[]> => {
  return new Promise((resolve, reject) => {
    const results: CourseCSV[] = [];

    fs.createReadStream(filePath) // Leer el archivo CSV
      .pipe(csvParser()) // Pasarlo a través del parser
      .on('data', (data) => results.push(data)) // Procesar cada fila
      .on('end', () => resolve(results)) // Resolver al finalizar
      .on('error', (error) => reject(error)); // Manejar errores
  });
};