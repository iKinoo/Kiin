import Category from "./Category";
import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import DegreeCategory from "./DegreeCategory";
import SemesterCategory from "./SemesterCategory";
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
        const degreeCategory = categories.find(cat => cat.title === 'Carrera') as (DegreeCategory | undefined);
        const semesterCategory = categories.find(cat => cat.title === 'Semestre') as (SemesterCategory | undefined);

        const isSeleceted = degreeCategory && semesterCategory && (degreeCategory.selectedValues.length > 0 || semesterCategory.selectedValues.length > 0)
        if (!isSeleceted) {
            this.values = this._original_values;
            return;
        };
        const selectedDegrees = degreeCategory.selectedValues;
        const selectedSemesters = semesterCategory.selectedValues;
        console.log(semesterCategory)
        this.values = this._original_values.filter(subject =>
            (selectedDegrees.length > 0 ? selectedDegrees.some(degree => subject.value.degrees.includes(degree.id)) : true)
            &&
            (selectedSemesters.length > 0 ? selectedSemesters.some(semester => subject.value.semestre.includes(semester)) : true)
        );
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