import { Course } from "../entities/Course";
import { Filter } from "../entities/filters/Filter";

export interface CoursesRepository {
  getAll(): Promise<Course[]>;
  getCoursesByFilter(filter: Filter): Promise<Course[]>;
}
