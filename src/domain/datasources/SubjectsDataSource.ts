import { Subject } from "../entities/Subject";

/**
 * metodos de obtencion de datos para materias
 */
export interface SubjectsDatasource {

    getAll(): Promise<Subject[]>;

}