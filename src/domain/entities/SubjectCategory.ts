import Category from "./Category";
// import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import { Degree } from "./Degree";
import DegreeCategory from "./DegreeCategory";
import SemesterCategory from "./SemesterCategory";
import { Subject } from "./Subject";
import SubjectFilter from "./SubjectFilter";

export default class SubjectCategory implements Category {
    title: string;
    values: { label: string; id: number; value: Subject; }[];
    private _original_values: { label: string; id: number; value: Subject; }[];
    private _selectedValues: Map<number, Subject> = new Map<number, Subject>();//Key values is the same as the id of the values array

    constructor(title: string, values: Subject[]) {
        this.title = title;
        this.values = values.map(subject => ({ label: subject.name, id: subject.id, value: subject }));
        this._original_values = this.values;
    }

    filterWithCategories(categories: Category[]): void {
        const categoriesHashMap: Map<string, Category> = new Map(categories.map(category => [category.title, category]));
        const degreeCategory = categoriesHashMap.get('Carrera') as (DegreeCategory | undefined);
        const semesterCategory = categoriesHashMap.get('Semestre') as (SemesterCategory | undefined);

        const isSelected = degreeCategory && semesterCategory && (degreeCategory.selectedValues.length > 0 || semesterCategory.selectedValues.length > 0)
        if (!isSelected) {
            this.values = this._original_values;
            return;
        };
        const selectedDegrees = degreeCategory.selectedValues;
        const selectedSemesters = semesterCategory.selectedValues;
        this.values = this.filterWithDegreesAndSemesters(selectedDegrees, selectedSemesters);
        this.deleteSelectedValuesWithoutRelation()
    }

    private deleteSelectedValuesWithoutRelation() {
        const selectedValuesToKeep = this.values.filter(value => this._selectedValues.has(value.id));
        this._selectedValues.clear();
        selectedValuesToKeep.forEach(value => this._selectedValues.set(value.id, value.value));
    }

    private filterWithDegreesAndSemesters(selectedDegrees: Degree[], selectedSemesters: number[]) {
        return this._original_values.filter(subject =>
            (selectedDegrees.length > 0 ? selectedDegrees.some(degree => subject.value.degrees.includes(degree.id)) : true)
            &&
            (selectedSemesters.length > 0 ? selectedSemesters.some(semester => subject.value.semestre.includes(semester)) : true)
        );

    }

    get selectedValues(): Subject[] {
        return Array.from(this._selectedValues.values());
    }
    toCourseFilter(): CourseFilter {
        return new SubjectFilter(Array.from(this._selectedValues.values()));
    }
    onClick(id: number): void {
        const selectedSubject = this._selectedValues.get(id);
        const isSelected = selectedSubject !== undefined;
        if (isSelected) {
            this._selectedValues.delete(id);
            return;
        }

        const newSelectedSubject = this.values.find(subject => subject.id === id);
        if (!newSelectedSubject) return
        this._selectedValues.set(newSelectedSubject.id, newSelectedSubject.value);
    }

    isSelected(id: number): boolean {
        return this._selectedValues.has(id);
    }
}