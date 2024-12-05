

export class Subject {

    private _type: string;
    private _name: string;
    private _model: string;
    private _acceptModifications: boolean;
    private _degree: string;
    private _semestre: number;

    constructor(name: string, model: string, acceptModifications: boolean, type: string, degree: string, semestre: number);
    constructor();

    constructor(name?: string, model?: string, acceptModifications?: boolean, type?: string, degree?: string, semestre?: number) {
        this._type = type ?? '';
        this._name = name ?? '';
        this._model = model ?? '';
        this._acceptModifications = acceptModifications ?? false;
        this._degree = degree ?? '';
        this._semestre = semestre ?? 0;
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
    get acceptModifstringications(): boolean {
        return this._acceptModifications;
    }
    get degree(): string {
        return this._degree;
    }
    get semestre(): number {
        return this._semestre;
    }

    get degrees(): string[] {
        return this.degree.split('-').map((degree) => degree.trim());
    }
}