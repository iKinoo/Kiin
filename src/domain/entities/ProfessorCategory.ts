import Category from "./Category";
import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import { Professor } from "./Professor";

export default class ProfessorCategory implements Category {
    title: string;
    values: { label: string; id: number; value: Professor; }[];
    private _selectedValues: Professor[] = [];

    constructor(title: string, values: Professor[]) {
        this.title = title;
        this.values = values.map(professor => ({ label: professor.fullName, id: professor.id, value: professor }));
    }

    filterWith(filters: CategoryFilter[]): void {
        if (filters.length === 0) {
            this._selectedValues = this.values.map(professor => professor.value);
            return;
        }
        //this._selectedValues = this.values.filter(professor => filters.every(filter => filter.satisfy(this)));
    }

    get selectedValues(): Professor[] {
        throw new Error("Method not implemented.");
    }
    toCourseFilter(): CourseFilter {
        throw new Error("Method not implemented.");
    }
    onClick(id: number): void {
        const selectedProfessorIndex = this._selectedValues.findIndex(professor => professor.id === id);
        if (selectedProfessorIndex === -1) {
            const newSelectedProfessor = this.values.find(professor => professor.id === id);
            if (!newSelectedProfessor) return

            this._selectedValues.push(newSelectedProfessor.value);
            return;
        }
        this._selectedValues.splice(selectedProfessorIndex, 1);
    }

}