import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Professor } from "@/domain/entities/Professor";
import { Subject } from "@/domain/entities/Subject";
import { CoursesModelDao } from "./CoursesModelDAO";


export class CoursesCsvDatasource implements CoursesDataSource {

    private courses: Course[] = [];
    private professors: Professor[] = [];
    private subjects: Subject[] = [];

    getAll(): Course[] {
        throw new Error("Method not implemented.");
    }


    async getCourses() {
        
        const results = await CoursesModelDao.getCourses();

        for (const result of results) {

            if (this.professors.find(professor => (professor.names === result.Nombres)) === undefined) {
                this.professors.push(new Professor(result.Nombres, result.Apellidos));

            }

        }

        for (const result of results) {

            if (this.subjects.find(subject => ((subject.name === result.Asignatura) && (subject.degree === result.PE))) === undefined) {
                this.subjects.push(new Subject(result.Asignatura, result.Modelo, true, result.Tipo, result.PE, parseInt(result.Semestre)));
            }

        }

        for (const result of results) {

            const professor = this.professors.find(professor => (professor.names === result.Nombres)) ?? new Professor();
            const subject = this.subjects.find(subject => ((subject.name === result.Asignatura) && (subject.degree === result.PE))) ?? new Subject();

            const course = new Course(subject, professor, [], parseInt(result.GRUPO), result.Modalidad);
            this.courses.push(course);
        }


        console.log(this.subjects)

    }
}