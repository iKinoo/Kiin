import { Course } from "../entities/Course";

export interface CoursesRepository {

    getAll(): Promise<Course[]>;

}