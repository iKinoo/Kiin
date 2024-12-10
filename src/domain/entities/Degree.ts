import { Subject } from "./Subject";

export class Degree {

    private _id: number;
    private _name: string;
    private _subjects: Subject[] = [];

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get subjects(): Subject[] {
        return this._subjects;
    }

    public addSubject(subject: Subject): void {
        this._subjects.push(subject);
    }

    public set subjects(subjects: Subject[]) {
        this._subjects = subjects;
    }
}