import { Course } from "./Course";

export interface Filter {
    filter(courses: Course[]): Promise<Course[]>;
}