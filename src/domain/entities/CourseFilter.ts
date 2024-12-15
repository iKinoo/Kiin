import { Course } from "./Course";

export default interface CourseFilter {
    satify(course: Course):  boolean
}