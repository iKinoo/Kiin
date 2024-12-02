import { Professor } from "./Professor";
import { Subject } from "./Subject";
import { Session } from "./Session";

export class Course {
  private _subject: Subject;
  private _professor: Professor;
  private _sessions: Session[];
  private _group: number;
  private _modality: string;

  constructor();
  constructor(
    subject: Subject,
    professor: Professor,
    sessions: Session[],
    group: number,
    modality: string
  );

  constructor(
    subject?: Subject,
    professor?: Professor,
    sessions?: Session[],
    group?: number,
    modality?: string
  ) {
    this._subject = subject ?? new Subject();
    this._professor = professor ?? new Professor();
    this._sessions = sessions ?? [];
    this._group = group ?? 0;
    this._modality = modality ?? "";
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
}
