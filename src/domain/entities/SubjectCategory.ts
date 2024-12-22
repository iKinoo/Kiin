import CourseFilter from "@/domain/entities/CourseFilter";
import { Degree } from "@/domain/entities/Degree";
import DynamicCategory from "@/domain/entities/DynamicCategory";
import { Subject } from "@/domain/entities/Subject";
import SubjectFilter from "@/domain/entities/SubjectFilter";

export default class SubjectCategory extends DynamicCategory<Subject> {
   
    constructor(title: string, values: Subject[]) {
        super(title, values.map(subject => ({ label: subject.name, id: subject.id, value: subject })));
    }
    
    filterWithDegreesAndSemesters(selectedDegrees: Degree[], selectedSemesters: number[]): { label: string; id: number; value: Subject; }[] {
        return this._original_values.filter(subject =>
            (selectedDegrees.length > 0 ? selectedDegrees.some(degree => subject.value.degrees.includes(degree.id)) : true)
            &&
            (selectedSemesters.length > 0 ? selectedSemesters.some(semester => subject.value.semestre.includes(semester)) : true)
        );

    }

    toCourseFilter(): CourseFilter {
        return new SubjectFilter(Array.from(this._selectedValues.values()));
    }
    
}