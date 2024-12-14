import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";
import { Mapper } from "../mappers/Mapper";

export class ProfessorsCsvDataSource implements ProfessorsDataSource {
  private professors: Professor[] = [];

  async getAll(): Promise<Professor[]> {
    const response = await fetch('/api/professors/all');

    this.professors = Mapper.toProfessors(await response.json());
    console.log(this.professors);
    return this.professors;

  }
}
