class Category {
    private title: string;
    private values: string[];

    constructor(title: string, values: string[]) {
        this.title = title;
        this.values = values;
    }

    public getTitle(): string {
        return this.title;
    }

    public getValues(): string[] {
        return this.values;
    }
}

export default Category;