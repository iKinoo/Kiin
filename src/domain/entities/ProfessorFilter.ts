import { Course } from "./Course";
import CourseFilter from "./CourseFilter";

export default class ProfessorFilter implements CourseFilter {
    private _professors: string[];

    constructor(professors: string[]) {
        this._professors = professors;
    }

    satify(course: Course): boolean {
        if (this._professors.length === 0) {
            return true;
        }
        return this._professors.includes(course.professor.fullName);
    }

}