import { Course } from "./Course";
import CourseFilter from "./CourseFiltert";

export default class DegreeFilter implements CourseFilter {
    private _degrees: string[];

    constructor(degrees: string[]) {
        this._degrees = degrees;
    }

    satify(course: Course): boolean {
        if (this._degrees.length === 0) {
            return true;
        }
        return this._degrees.includes(course.subject.degreeResume);
    }
}