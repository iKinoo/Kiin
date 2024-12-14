import { Course } from "./Course";
import CourseFilter from "./CourseFiltert";

export default class SubjectFilter implements CourseFilter {
    private _subjects: string[];

    constructor(subjects: string[]) {
        this._subjects = subjects;
    }

    satify(course: Course): boolean {
        if (this._subjects.length === 0) {
            return true;
        }
        return this._subjects.includes(course.subject.name);
    }
}