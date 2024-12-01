

export class Subject {

    private _type: string;
    private _name: string;
    private _group: number;
    private _semester: number;
    private _model: string;
    private _acceptModifications: boolean;

    constructor(name: string, group: number, semester: number, model: string, acceptModifications: boolean, type: string);
    constructor();

    constructor(name?: string, group?: number, semester?: number, model?: string, acceptModifications?: boolean, type?: string) {
        this._type = type ?? '';
        this._name = name ?? '';
        this._group = group ?? 0;
        this._semester = semester ?? 0;
        this._model = model ?? '';
        this._acceptModifications = acceptModifications ?? false;
    }
}