import Category from "@/domain/entities/Category";
import CourseFilter from "@/domain/entities/CourseFilter";
import { Degree } from "@/domain/entities/Degree";
import DynamicCategory from "@/domain/entities/DynamicCategory";
import { Professor } from "@/domain/entities/Professor";
import ProfessorFilter from "@/domain/entities/ProfessorFilter";
import SubjectCategory from "@/domain/entities/SubjectCategory";
import DegreeCategory from "@/domain/entities/DegreeCategory";
import { Subject } from "@/domain/entities/Subject";

export default class ProfessorCategory extends DynamicCategory<Professor> {
    private _currentSelectedSubjects: Subject[] = [];
    constructor(title: string, values: Professor[]) {
        super(title, values.map(professor => ({ label: professor.fullName, id: professor.id, value: professor })));
    }

    filterWithCategories(categories: Category[]): void {
        const categoriesHashMap: Map<string, Category> = new Map(categories.map(category => [category.title, category]));
        const degreeCategory = categoriesHashMap.get('Carrera') as (DegreeCategory | undefined);
        const subjectCategory = categoriesHashMap.get('Materia') as (SubjectCategory | undefined);
        const isSelected = degreeCategory  && subjectCategory && (degreeCategory.selectedValues.length > 0 || subjectCategory.selectedValues.length > 0);
        if (!isSelected) {
            this.values = this._original_values;
            return;
        };
        const selectedDegrees = degreeCategory.selectedValues;
        const selectedSubjects = subjectCategory.selectedValues;
        this._currentSelectedSubjects = selectedSubjects;
        this.values = this.filterWithDegreesAndSemesters(selectedDegrees);
        this.deleteSelectedValuesWithoutRelation()
        this._currentSelectedSubjects = []
    }
    filterWithDegreesAndSemesters(selectedDegrees: Degree[]): { label: string; id: number; value: Professor; }[] {
        const selectedSubject = this._currentSelectedSubjects
        
        return this._original_values.filter(professorValue =>
            (selectedDegrees.length > 0 ? selectedDegrees.some(degree => degree.subjects.some(subject => subject.professors.includes(professorValue.value.id))) : true)
            &&
            ((selectedSubject.length > 0) ? selectedSubject.some(subject => subject.professors.includes(professorValue.id)) : true)
        );
    }
    toCourseFilter(): CourseFilter {
        return new ProfessorFilter(Array.from(this._selectedValues.values()))
    }

}