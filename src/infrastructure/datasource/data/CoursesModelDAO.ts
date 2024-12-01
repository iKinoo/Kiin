import csvParser from "csv-parser";
import { CourseCSV } from "../../models/CourseModel";
import fs from 'fs'; // Importar el módulo de sistema de archivos

export class CoursesModelDao {

    private static _results: CourseCSV[] = [];

    private static async readCSV(filePath: string): Promise<CourseCSV[]> {
        return new Promise((resolve, reject) => {

            const results: CourseCSV[] = [];

            fs.createReadStream(filePath) // Leer el archivo CSV
                .pipe(csvParser()) // Pasarlo a través del parser
                .on('data', (data) => results.push(data)) // Procesar cada fila
                .on('end', () => resolve(results)) // Resolver al finalizar
                .on('error', (error) => reject(error)); // Manejar errores

            return results;
        });
    };

    static async getCourses() {

        if (this._results.length > 0) {
            return this._results;
        }
        // Llamar a la función y mostrar los datos
        const filePath = 'src/infrastructure/datasource/data/data.csv'; // Ruta del archivo
        return await this.readCSV(filePath)
            .catch((error) => {
                console.error('Error al leer el archivo CSV:', error);
            }) ?? [];
    }
}