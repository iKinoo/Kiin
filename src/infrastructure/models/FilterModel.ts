class FilterModel {
    private _degrees: string[];
    private _semesters: number[];
    private _professors: string[];
    private _subjects: string[];

    constructor(
        degrees: string[],
        semesters: number[],
        professors: string[],
        subjects: string[]
    ) {
        this._degrees = degrees;
        this._semesters = semesters;
        this._professors = professors;
        this._subjects = subjects
    }

    get degrees(): string[] {
        return this._degrees;
    }

    get semesters(): number[] {
        return this._semesters;
    }

    get professors(): string[] {
        return this._professors;
    }

    get subjects(): string[] {
        return this._subjects;
    }

}

export default FilterModel;