

export class Subject {

    private _id: number;
    private _name: string;
    private _semesters: number[] = [];
    private _degreesIds: number[] = [];
    private _coursesIds: number[] = [];
    private _professorsIds: number[] = [];
    private _type: string;
    private _model: string;
    private _degreeResume: string;
    
    constructor(id: number, name: string, degreeResume : string, model: string, type: string, semesters: number[]) {
        this._degreeResume = degreeResume;
        this._id = id;
        this._name = name;
        this._semesters = semesters;
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
    get degrees(): number[] {
        return this._degreesIds;
    }
    get semestre(): number[] {
        return this._semesters;
    }
    get id(): number {
        return this._id;
    }
    get courses(): number[] {
        return this._coursesIds;
    }

    set degrees(degrees: number[]) {
        this._degreesIds = degrees;
    }

    set courses(courses: number[]) {
        this._coursesIds = courses;
    }

    public addDegree(degree: number): void {
        this._degreesIds.push(degree);
    }

    public addCourse(course: number): void {
        this._coursesIds.push(course);
    }

    public addProfessor(professor: number): void {
        this._professorsIds.push(professor);
    }
}