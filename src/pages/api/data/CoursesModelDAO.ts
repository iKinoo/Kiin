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

    const localDev = false;

    if (localDev) {
      const url = 'public/data_verano_2025.csv'
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
        .on('data', (data) => {
          results.push(fromRawToCourseCSV(data)); // Procesar cada fila y convertirla a CourseCSV
        }) // Procesar cada fila
        .on('end', () => resolve(results)) // Resolver al finalizar
        .on('error', (error) => reject(error)); // Manejar errores
    } catch (error) {
      reject(error); // Manejar cualquier error de fetch o de otro tipo
    }
  });
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromRawToCourseCSV = (raw: any): CourseCSV => {

  const periodoKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'periodo'
  );
  const tipoKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'tipo'
  );
  const asignaturaKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'asignatura'
  );
  const grupoKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'grupo'
  );
  const semestreKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'semestre'
  );
  const peKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'pe'
  );
  const horasSemanaKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'horas_a_la_semana'
  );
  const modalidadKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'modalidad'
  );
  const modeloKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'modelo'
  );
  const nombresKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'nombres'
  );
  const apellidosKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'apellidos'
  );
  const lunesKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'lunes'
  );
  const martesKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'martes'
  );
  const miercolesKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^\wáéíóúüñ]/g, '').replace('é','e') === 'miercoles'
  );
  const juevesKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'jueves'
  );
  const viernesKey = Object.keys(raw).find(
    key => key.trim().toLowerCase().replace(/[^a-z]/g, '') === 'viernes'
  );

  const aulaKeys = Object.keys(raw).filter(
    key => key.trim().toLowerCase().startsWith('aula')
  );
  const aula1Key = aulaKeys[0];
  const aula2Key = aulaKeys[1];
  const aula3Key = aulaKeys[2];
  const aula4Key = aulaKeys[3];
  const aula5Key = aulaKeys[4];


  return {
    Periodo: raw[periodoKey as keyof typeof raw] || '',
    Tipo: raw[tipoKey as keyof typeof raw] || '',
    Asignatura: raw[asignaturaKey as keyof typeof raw] || '',
    GRUPO: raw[grupoKey as keyof typeof raw] || '',
    PE: raw[peKey as keyof typeof raw] || '',
    Semestre: raw[semestreKey as keyof typeof raw] || '',
    Horas_a_la_semana: raw[horasSemanaKey as keyof typeof raw] || '',
    Modalidad: raw[modalidadKey as keyof typeof raw] || '',

    Modelo: raw[modeloKey as keyof typeof raw] || '',
    Nombres: raw[nombresKey as keyof typeof raw] || '',
    Apellidos: raw[apellidosKey as keyof typeof raw] || '',


    Lunes: raw[lunesKey as keyof typeof raw] || '',
    Aula1: raw[aula1Key as keyof typeof raw] || '',
    Martes: raw[martesKey as keyof typeof raw] || '',
    Aula2: raw[aula2Key as keyof typeof raw] || '',
    Miercoles: raw[miercolesKey as keyof typeof raw] || '',
    Aula3: raw[aula3Key as keyof typeof raw] || '',
    Jueves: raw[juevesKey as keyof typeof raw] || '',
    Aula4: raw[aula4Key as keyof typeof raw] || '',
    Viernes: raw[viernesKey as keyof typeof raw] || '',
    Aula5: raw[aula5Key as keyof typeof raw] || '',

    Hr_Pres: "",
    Hr_Pres2: "",
    Hr_N_P: "",
    Creditos: "",

    Cupo: "",
    LIC_MEFI: "",
    LCC_MEFI: "",
    LIS_MEFI: "",
    LA_MEFI: "",
    LEM_MEFI: "",
    LM: "",
  }
}




const readLocalCSV = (filePath: string): Promise<CourseCSV[]> => {
  return new Promise((resolve,
    reject) => {
    const results: CourseCSV[] = [];

    fs.createReadStream(filePath) // Leer el archivo CSV
      .pipe(csvParser()) // Pasarlo a través del parser
      .on('data', (data) => results.push(data)) // Procesar cada fila
      .on('end', () => resolve(results)) // Resolver al finalizar
      .on('error', (error) => reject(error)); // Manejar errores
  });
};