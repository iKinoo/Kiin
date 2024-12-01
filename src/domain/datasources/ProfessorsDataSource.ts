import { Professor } from "../entities/Professor";

export interface ProfessorsDataSource {

    getAll(): Professor[];

}