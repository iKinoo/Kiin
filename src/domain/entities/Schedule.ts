import { Course } from "./Course";
import { Professor } from "./Professor";
import { Subject } from "./Subject";


export class Schedule {

    private _id: number;
    private subjects: Subject[];
    private professors: Professor[];
    private courses: Course[];

    constructor(id: number, subjects: Subject[], professors: Professor[], courses: Course[]) {
        this._id = id;
        this.subjects = subjects;
        this.professors = professors;
        this.courses = courses;

    }
}