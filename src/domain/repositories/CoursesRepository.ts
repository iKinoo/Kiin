import { Course } from "../entities/Course";
import { Filter } from "../entities/Filter";
/**
 * metodos de obtencion de cursos desde un repositorio
 */
export interface CoursesRepository {
  getAll(): Promise<Course[]>;
  getCoursesByFilter(filter: Filter): Promise<Course[]>;
}
