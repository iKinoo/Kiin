import { Professor } from "../entities/Professor";
/**
 * metodos de obtencion de profesores desde un repositorio
 */
export interface ProfessorsRepository {

    getAll(): Promise<Professor[]>;

}