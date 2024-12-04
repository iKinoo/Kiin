import { Course } from "./Course";

/**
 * metodos de una clase de filtrado de cursos
 */
export interface Filter {
    filter(courses: Course[]): Promise<Course[]>;
}