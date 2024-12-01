import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Subject } from "@/domain/entities/Subject";
import { CoursesModelDao } from "./CoursesModelDAO";


export class CoursesCsvDatasource implements CoursesDataSource {

    private courses: Course[] = [];
    
    private subjects: Subject[] = [];

    getAll(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }


    async getCourses() {
        
        const results = await CoursesModelDao.getCourses();

        

        for (const result of results) {

            if (this.subjects.find(subject => ((subject.name === result.Asignatura) && (subject.degree === result.PE))) === undefined) {
                this.subjects.push(new Subject(result.Asignatura, result.Modelo, true, result.Tipo, result.PE, parseInt(result.Semestre)));
            }

        }

    }
}