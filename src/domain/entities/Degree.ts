import { Course } from "./Course";

export class Degree {

    private _name: string;
    private _courses: Course[];

    constructor(name: string, courses: Course[]) {
        this._name = name;
        this._courses = courses;
    }

    public get name(): string {
        return this._name;
    }
    public get courses(): Course[] {
        return this._courses;
    }
}