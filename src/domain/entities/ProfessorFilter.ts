import { Course } from "./Course";
import CourseFilter from "./CourseFiltert";

export default class ProfessorFilter implements CourseFilter {
    private _professors: string[];

    constructor(professors: string[]) {
        this._professors = professors;
    }

    satify(course: Course): boolean {
        return this._professors.includes(course.professor.fullName);
    }

}