import { Course } from "@/domain/entities/Course";
import CourseFilter from "@/domain/entities/CourseFilter";
import { Modalities } from "@/domain/entities/Modalities";

export default class ModalityFilter implements CourseFilter {
    modalities: Modalities[]
    constructor(modalities: Modalities[]) {
        this.modalities = modalities;
    }

    satify(course: Course): boolean {
        return this.modalities.some(modality => modality.toLowerCase() === course.modality.toLowerCase());
    }

}