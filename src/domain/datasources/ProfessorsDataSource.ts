import { Professor } from "../entities/Professor";
/**
 * metodos de obtencion de datos para tipo profesor
 */
export interface ProfessorsDataSource {

    getAll(): Promise<Professor[]>;

}