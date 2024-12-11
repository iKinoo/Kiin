import { Course } from "./Course";
import { Degree } from "./Degree";


export class Subject {

    private _id: number;
    private _name: string;
    private _semester: number;
    private _degrees: Degree[] = [];
    private _courses: Course[] = [];
    private _type: string;
    private _model: string;
    private _degreeResume: string;
    
    constructor(id: number, name: string, degreeResume : string, model: string, type: string, semester: number) {
        this._degreeResume = degreeResume;
        this._id = id;
        this._name = name;
        this._semester = semester;
        this._model = model;
        this._type = type;
    }
    public get degreeResume(): string {
        return this._degreeResume;
    }

    get type(): string {
        return this._type;
    }
    get name(): string {
        return this._name;
    }
    get model(): string {
        return this._model;
    }
    get degrees(): Degree[] {
        return this._degrees;
    }
    get semestre(): number {
        return this._semester;
    }
    get id(): number {
        return this._id;
    }
    get courses(): Course[] {
        return this._courses;
    }

    set degrees(degrees: Degree[]) {
        this._degrees = degrees;
    }

    set courses(courses: Course[]) {
        this._courses = courses;
    }

    public addDegree(degree: Degree): void {
        this._degrees.push(degree);
    }

    public addCourse(course: Course): void {
        this._courses.push(course);
    }
}