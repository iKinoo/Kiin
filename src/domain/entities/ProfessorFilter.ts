import { Course } from "./Course";
import CourseFilter from "./CourseFilter";
import { Professor } from "./Professor";

export default class ProfessorFilter implements CourseFilter {
    private _professors: Professor[];

    constructor(professors: Professor[]) {
        this._professors = professors;
    }

    satify(course: Course): boolean {
        if (this._professors.length === 0) {
            return true;
        }
        return this._professors.some(professor => professor.id === course.professor.id);
    }

}