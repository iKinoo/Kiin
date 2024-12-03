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
  constructor(
    _subject?: Subject,
    _professor?: Professor,
    _sessions?: Session[],
    _group?: number,
    _modality?: string,
    _color?: string
  );

  constructor(
    subject?: Subject,
    professor?: Professor,
    sessions?: Session[],
    group?: number,
    modality?: string,
    _color?: string
  ) {
    this._subject = subject ?? new Subject();
    this._professor = professor ?? new Professor();
    this._sessions = sessions ?? [];
    this._group = group ?? 0;
    this._modality = modality ?? "";
    this._color = _color ?? "";
  }

  get modality() {
    return this._modality;
  }

  get subject() {
    return this._subject;
  }

  get professor() {
    return this._professor;
  }
  public get sessions(): Session[] {
    return this._sessions;
  }

  public get group(): number {
    return this._group;
  }
  public get color(): string {
    return this._color;
  }
}
