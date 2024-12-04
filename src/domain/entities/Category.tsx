class Category {
    private _title: string;
    private _values: string[];

    constructor(title: string, values: string[]) {
        this._title = title;
        this._values = values;
    }

    get title(): string {
        return this._title;
    }

    get values(): string[] {
        return this._values;
    }
}

export default Category;