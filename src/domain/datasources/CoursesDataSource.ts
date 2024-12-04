import { Course } from "../entities/Course";
import { Filter } from "../entities/Filter";
/**
 * metodos de obtencion de datos para cursos
 */
export interface CoursesDataSource {
  getAll(): Promise<Course[]>;
  getCoursesByFilter(filter: Filter): Promise<Course[]>;
}
