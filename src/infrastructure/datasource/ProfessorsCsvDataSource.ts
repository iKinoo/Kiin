import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";
import { CoursesModelDao } from "./data/CoursesModelDAO";
import { CourseCSV } from "../models/CourseModel";

/**
 * Clase para la obtencion de profesores desde la fuente de datos CVS
 */
export class ProfessorsCsvDataSource implements ProfessorsDataSource {
  private professors: Professor[] = [];

  /**
   * Obtencion de los profesores desde la fuente
   * @returns todos los profesores
   */
  async getAll(): Promise<Professor[]> {
    const results = await CoursesModelDao.getCourses();
    //verifica que haya duplicacion de profesores
    for (const result of results) {
      if (this.findProfessor(result)) {
        this.professors.push(new Professor(result.Nombres, result.Apellidos));
      }
    }

    return this.professors;
  }

  /**
   * Verifica que un profesor no este en la lista
   * @param result todos los cursos desde la fuente
   * @returns true si no esta en la lista
   */
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
