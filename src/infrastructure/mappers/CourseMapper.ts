import { Course } from "@/domain/entities/Course";
import { CourseCSV } from "../models/CourseModel";
import { Subject } from "@/domain/entities/Subject";
import { Professor } from "@/domain/entities/Professor";


export class CourseMapper {

    static fromCsvCourseToEntity(csvCourse: CourseCSV): Course {
        return new Course(
            new Subject(csvCourse.Asignatura, Number(csvCourse.Semestre), csvCourse.Modelo, false, csvCourse.Tipo),
            new Professor(csvCourse.Nombres, csvCourse.Apellidos),
            [],
            Number(csvCourse.GRUPO),
            csvCourse.Modalidad,
        );
    }
}