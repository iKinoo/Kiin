import { Subject } from "@/domain/entities/Subject";
import { CourseCSV } from "./CourseModel";

export class SubjectMapper {

    public static fromModelToEntity(count: number, model: CourseCSV): Subject {

        const semesters = model.SEMESTRE.split(",").map((semester) => parseInt(semester));
        const subject = new Subject(count, model.Asignatura, model.PE, model.MODELO, model.Tipo, semesters);
        return subject;
    }

}