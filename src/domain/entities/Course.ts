import { Professor } from "./Professor";
import { Subject } from "./Subject";
import { Session } from "./Session";

export class Course {

    private _subject: Subject;
    private _professor: Professor;
    private _sessions: Session[];
    private _group: number;
    private _modality: string;
    private _color: string;

    constructor();
    constructor(subject: Subject, professor: Professor, sessions: Session[], group: number, modality: string, color?: string);

    constructor(subject?: Subject, professor?: Professor, sessions?: Session[], group?: number, modality?: string, color?: string) {
        this._subject = subject ?? new Subject();
        this._professor = professor ?? new Professor();
        this._sessions = sessions ?? [];
        this._group = group ?? 0;
        this._modality = modality ?? '';
        this._color = color ?? '';

    }

    get subject(): Subject {
        return this._subject;
    }
    get professor(): Professor {
        return this._professor;
    }
    get sessions(): Session[] {
        return this._sessions;
    }
    get group(): number {
        return this._group;
    }
    get modality(): string {
        return this._modality;
    }
    public get color(): string {
        return this._color;
    }

}