import { Course } from "../entities/Course";

export interface CoursesDataSource {
  getAll(): Promise<Course[]>;
}
