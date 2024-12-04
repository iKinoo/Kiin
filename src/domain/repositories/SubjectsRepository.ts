import { Subject } from "../entities/Subject";

/**
 * metodos de obtencion de materias desde un repositorio
 */
export interface SubjectsRepository {

    getAll(): Promise<Subject[]>;

}