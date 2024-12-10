import { Course } from "./Course";
import { Professor } from "./Professor";
import { Subject } from "./Subject";


export class Schedule {

    private _id: number;
    private _subjects: Subject[] = [];
    private _professors: Professor[] = [];
    private _courses: Course[] = [];

    constructor(id: number) {
        this._id = id;
    }

    public get id(): number {
        return this._id;
    }

    public get subjects(): Subject[] {
        return this.subjects;
    }

    public get professors(): Professor[] {
        return this._professors;
    }

    public get courses(): Course[] {
        return this._courses;
    }

    public addSubject(subject: Subject): void {
        this._subjects.push(subject);
    }

    public addProfessor(professor: Professor): void {
        this._professors.push(professor);
    }

    public addCourse(course: Course): void {
        this._courses.push(course);
    }

    public set subjects(subjects: Subject[]) {
        this._subjects = subjects;
    }

    public set professors(professors: Professor[]) {
        this._professors = professors;
    }

    public set courses(courses: Course[]) {
        this._courses = courses;
    }
}