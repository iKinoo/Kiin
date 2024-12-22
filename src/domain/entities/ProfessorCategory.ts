import Category from "./Category";
// import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import DegreeCategory from "./DegreeCategory";
import { Professor } from "./Professor";
import ProfessorFilter from "./ProfessorFilter";
import SemesterCategory from "./SemesterCategory";

export default class ProfessorCategory implements Category {
    title: string;
    values: { label: string; id: number; value: Professor; }[];
    private _selectedValues: Map<number, Professor> = new Map();//Key values is the same as the id of the values array
    private _original_values: { label: string; id: number; value: Professor; }[];

    constructor(title: string, values: Professor[]) {
        this.title = title;
        this.values = values.map(professor => ({ label: professor.fullName, id: professor.id, value: professor }));
        this._original_values = this.values;
    }

    filterWithCategories(categories: Category[]): void {
        const categoriesHashMap: Map<string, Category> = new Map(categories.map(category => [category.title, category]));        
        const degreeCategory = categories.find(cat => cat.title === 'Carrera') as (DegreeCategory | undefined);
        const semesterCategory = categories.find(cat => cat.title === 'Semestre') as (SemesterCategory | undefined);

        // const isSeleceted = degreeCategory && semesterCategory && (degreeCategory.selectedValues.length > 0 || semesterCategory.selectedValues.length > 0)
        // if (!isSeleceted) {
        //     this.values = this._original_values;
        //     return;
        // };
        // const selectedDegrees = degreeCategory.selectedValues;
        // const selectedSemesters = semesterCategory.selectedValues;
        // console.log(semesterCategory)
        // this.values = this._original_values.filter(subject =>
        //     (selectedDegrees.length > 0 ? selectedDegrees.some(degree => subject.value.degrees.includes(degree.id)) : true)
        //     &&
        //     (selectedSemesters.length > 0 ? selectedSemesters.some(semester => subject.value.semestre.includes(semester)) : true)
        // );
    }

    get selectedValues(): Professor[] {
        return Array.from(this._selectedValues.values());
    }
    toCourseFilter(): CourseFilter {
        return new ProfessorFilter(Array.from(this._selectedValues.values()));
    }
    onClick(id: number): void {
        const selectedProfessor = this._selectedValues.get(id);
        const isSelected = selectedProfessor !== undefined;
        if (isSelected) {
            this._selectedValues.delete(id);
            return;
        }

        const newSelectedProfessor = this.values.find(professor => professor.id === id);
        if (!newSelectedProfessor) return
        this._selectedValues.set(newSelectedProfessor.id, newSelectedProfessor.value);
    }

    isSelected(id: number): boolean {
        return this._selectedValues.has(id);
    }
}