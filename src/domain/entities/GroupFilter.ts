import CourseFilter from "./CourseFilter";
import { Course } from "./Course";
import { Group } from "./Group";

export default class GroupFilter implements CourseFilter {
    private _groups: Group[] = [];

    constructor(groups: Group[]) {
        this._groups = groups;
    }

    satify(course: Course): boolean {
        if (this._groups.length === 0) return true;
        return this._groups.some(group => group === course.group);
    }
}