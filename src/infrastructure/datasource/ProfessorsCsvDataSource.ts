import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";
import { CoursesModelDao } from "./data/CoursesModelDAO";
import { CourseCSV } from "../models/CourseModel";

export class ProfessorsCsvDataSource implements ProfessorsDataSource {
  private professors: Professor[] = [];

  async getAll(): Promise<Professor[]> {
    const results = await CoursesModelDao.getCourses();

    for (const result of results) {
      if (this.findProfessor(result)) {
        this.professors.push(new Professor(result.Nombres, result.Apellidos));
      }
    }

    return this.professors;
  }

  // Todo: make this more legible
  private findProfessor(result: CourseCSV): boolean {
    return (
      this.professors.find(
        (professor) =>
          professor.names === result.Nombres &&
          professor.lastNames === result.Apellidos
      ) === undefined
    );
  }
}
