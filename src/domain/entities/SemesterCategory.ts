import Category from "./Category";
// import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import SemesterFilter from "./SemesterFilter";

export default class SemesterCategory implements Category {
    title: string;
    values: {label: string, id: number,value: number}[];
    private _selectedValues: number[] = [];

    constructor(title: string, values: number[]) {
        this.title = title;
        this.values = values.map(semester => ({label: semester.toString(), id: semester, value: semester}));
    }

    filterWithCategories(categories: Category[]): void {
        console.log(categories);
        //this._selectedValues = filters.map(filter => filter.satisfy(this)).flat();
        throw new Error("Method not implemented.");
    }

    get selectedValues(): number[] {
        return this._selectedValues;
    }

    toCourseFilter(): CourseFilter {
        return new SemesterFilter(this._selectedValues);
    }

    onClick(id: number): void {
        if (this._selectedValues.includes(id)) {
            this._selectedValues = this._selectedValues.filter(value => value !== id);
        } else {
            this._selectedValues.push(id);
        }
    }
}