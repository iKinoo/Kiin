import Category from "@/domain/entities/Category";
import CategoryFilter from "@/domain/entities/CategoryFilter";
import CourseFilter from "@/domain/entities/CourseFilter";
import { Degree } from "@/domain/entities/Degree";
import DegreeFilter from "@/domain/entities/DegreeFilter";

export default class DegreeCategory implements Category {
    title: string;
    values: {label: string, id: number, value: Degree}[];
    private _selectedValues: Degree[] = [];

    constructor(title: string, values: Degree[]) {
        this.title = title;
        this.values = values.map(degree => ({label: degree.name, id: degree.id, value: degree}));
    }
    filterWith(filters: CategoryFilter[]): void {
        if (filters.length === 0) {
            this._selectedValues = this.values.map(degree => degree.value);
            return;
        }
        this._selectedValues = this.values.filter(degree => filters.every(filter => filter.satisfy(this)));
    }

    onClick(id: number): void {
        const selectedDegreeIndex = this._selectedValues.findIndex(degree => degree.id === id);
        if (selectedDegreeIndex === -1) {
            const newSelectedDegree = this.values.find(degree => degree.id === id);
            if (!newSelectedDegree) return

            this._selectedValues.push(newSelectedDegree.value);
            return;
        }
        this._selectedValues.splice(selectedDegreeIndex, 1);
    }

    get selectedValues(): Degree[] {
        return this._selectedValues;
    }

    toCourseFilter(): CourseFilter {
        throw new Error("Method not implemented.");
        // return new DegreeFilter(this.title, this._selectedValues.map(degree => degree.id));
    }

}