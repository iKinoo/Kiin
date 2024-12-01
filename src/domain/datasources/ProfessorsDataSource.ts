import { Professor } from "../entities/Professor";

export interface ProfessorsDataSource {

    getAll(): Promise<Professor[]>;

}