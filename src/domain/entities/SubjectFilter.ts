import { Course } from "./Course";
import CourseFilter from "./CourseFilter";
import { Subject } from "./Subject";

export default class SubjectFilter implements CourseFilter {
    private _subjects: Subject[];

    constructor(subjects: Subject[]) {
        this._subjects = subjects;
    }

    satify(course: Course): boolean {
        if (this._subjects.length === 0) {
            return true;
        }
        return this._subjects.some(subject => subject.id === course.subject.id);
    }
}