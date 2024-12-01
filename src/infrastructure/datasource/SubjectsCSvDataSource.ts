import { CoursesModelDao } from "./CoursesModelDAO";
import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";

export class SubjectsCsvDataSource implements SubjectsDatasource {
    private subjects: Subject[] = [];


    async getAll(): Promise<Subject[]> {

        if (this.subjects.length > 0) {
            return this.subjects;
        }

        const results = await CoursesModelDao.getCourses();
        for (const result of results) {

            if (this.subjects.find(subject => ((subject.name === result.Asignatura) && (subject.degree === result.PE))) === undefined) {
                this.subjects.push(new Subject(result.Asignatura, result.Modelo, true, result.Tipo, result.PE, parseInt(result.Semestre)));
            }

        }
        return this.subjects;
    }


}