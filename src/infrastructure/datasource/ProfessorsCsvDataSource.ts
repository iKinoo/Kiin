import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";

export class ProfessorsCsvDataSource implements ProfessorsDataSource {
    
    getAll(): Professor[] {
        throw new Error("Method not implemented.");
    }
}