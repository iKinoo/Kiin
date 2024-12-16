import { Course } from "./Course";
import CourseFilter from "./CourseFilter";

export default class SemesterFilter implements CourseFilter {
    private _semesters: number[];
  
    constructor(semesters: number[]) {
        this._semesters = semesters;
    }
  
    satify(course: Course): boolean {
        if (this._semesters.length === 0) {
            return true;
        }
        return this._semesters.every(
            (semester) => (course.subject.semestre.includes(semester))
        );
    }
  
  }