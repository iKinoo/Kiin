import { Course } from "@/domain/entities/Course";
import CourseFilter from "@/domain/entities/CourseFilter";
import { Modalities } from "@/domain/entities/Modalities";

export default class ModalityFilter implements CourseFilter {
    private _modalities: Modalities[]
    constructor(modalities: Modalities[]) {
        this._modalities = modalities;
    }

    satify(course: Course): boolean {
        if (this._modalities.length === 0) return true;
        return this._modalities.some(modality => modality.toLowerCase() === course.modality.toLowerCase());
    }

}