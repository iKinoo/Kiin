import CourseFilter from "@/domain/entities/CourseFilter";
import DegreeFilter from "@/domain/entities/DegreeFilter";
import ProfessorFilter from "@/domain/entities/ProfessorFilter";
import SemesterFilter from "@/domain/entities/SemesterFilter";
import SubjectFilter from "@/domain/entities/SubjectFilter";

class FilterModel {
    private _degrees: string[];
    private _semesters: number[];
    private _professors: string[];
    private _subjects: string[];

    constructor(
        degrees: string[],
        semesters: number[],
        professors: string[],
        subjects: string[]
    ) {
        this._degrees = degrees;
        this._semesters = semesters;
        this._professors = professors;
        this._subjects = subjects
    }

    get degrees(): string[] {
        return this._degrees;
    }

    get semesters(): number[] {
        return this._semesters;
    }

    get professors(): string[] {
        return this._professors;
    }

    get subjects(): string[] {
        return this._subjects;
    }

    getFilters(): CourseFilter[] {
        const filters: CourseFilter[] = [];
        filters.push(new DegreeFilter(this._degrees));
        filters.push(new SemesterFilter(this._semesters));
        filters.push(new ProfessorFilter(this._professors));
        filters.push(new SubjectFilter(this._subjects));
        return filters;
    }

    isEmpty(): boolean {
        return this._degrees.length === 0 && this._semesters.length === 0 && this._professors.length === 0 && this._subjects.length === 0;
    }

}

export default FilterModel;