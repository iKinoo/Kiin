import csvParser from "csv-parser";
import { CourseCSV } from "./CourseModel";
import { Readable } from "stream";


export class CoursesModelDao {
  private static _results: CourseCSV[] = [];

  static async getCourses(): Promise<CourseCSV[]> {
    if (this._results.length > 0) {
      return this._results;
    }

    const url = `${process.env.VERCEL_URL}/data.csv`;
    // const response = await fetch(`https://${url}`); // Asegúrate de usar https
    //const filePath = 'public/data.csv'; // Ruta del archivo
    this._results = await readCSV(url);
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
