import { Professor } from "../entities/Professor";

export interface ProfessorsRepository {

    getAll(): Promise<Professor[]>;

}