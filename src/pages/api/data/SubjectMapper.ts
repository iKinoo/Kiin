import { Subject } from "@/domain/entities/Subject";
import { CourseCSV } from "./CourseModel";

// Tell Next.js this is not an API route
export const config = {
    api: {
        externalResolver: true,
    },
};

export class SubjectMapper {

    public static fromModelToEntity(count: number, model: CourseCSV): Subject {
        const semesters = model.Semestre.split(",").map((semester) => parseInt(semester));
        const subject = new Subject(count, model.Asignatura, model.PE, model.Modelo, model.Tipo, semesters);
        return subject;
    }

}