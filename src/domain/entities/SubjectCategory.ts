import Category from "./Category";
import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import DegreeCategory from "./DegreeCategory";
import { Subject } from "./Subject";
import SubjectFilter from "./SubjectFilter";

export default class SubjectCategory implements Category {
    title: string;
    values: { label: string; id: number; value: Subject; }[];
    private _original_values: { label: string; id: number; value: Subject; }[];
    private _selectedValues: Subject[] = [];

    constructor(title: string, values: Subject[]) {
        this.title = title;
        this.values = values.map(subject => ({ label: subject.name, id: subject.id, value: subject }));
        this._original_values = this.values;
    }

    filterWithCategories(categories: Category[]): void {
        const degreeCategory = categories.find(cat => cat.title === 'Degree') as (DegreeCategory | undefined);
        if (!degreeCategory) return;
        this.values = this._original_values.filter(subject => degreeCategory.selectedValues.some(degree => subject.value.degrees.includes(degree.id)));
    }

    get selectedValues(): Subject[] {
        return this._selectedValues;
    }
    toCourseFilter(): CourseFilter {
        return new SubjectFilter(this._selectedValues);
    }
    onClick(id: number): void {
        const selectedSubjectIndex = this._selectedValues.findIndex(subject => subject.id === id);
        if (selectedSubjectIndex === -1) {
            const newSelectedSubject = this.values.find(subject => subject.id === id);
            if (!newSelectedSubject) return

            this._selectedValues.push(newSelectedSubject.value);
            return;
        }
        this._selectedValues.splice(selectedSubjectIndex, 1);
    }
}