/**
 * Abstraccion de un profesor
 */
export class Professor {
  private _names: string;
  private _lastNames: string;

  constructor(names: string, lastNames: string);
  constructor();
  constructor(names?: string, lastNames?: string) {
    this._names = names || "";
    this._lastNames = lastNames || "";
  }

  get names(): string {
    return this._names;
  }

  get lastNames(): string {
    return this._lastNames;
  }

  /**
   * obtencion del nombre completo del profesor 
   * */
  fullName(): string {
    return `${this._names} ${this._lastNames}`;
  }
}
