import { CoursesModelDao } from "./data/CoursesModelDAO";
import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";
/**
 * Clase para la obtencion de materias desde la funte de datos CSV
 */
export class SubjectsCsvDataSource implements SubjectsDatasource {
    private subjects: Subject[] = [];

    /**
     * obtiene las materias desde la fuente
     * @returns todas las materias encontradas
     */
    async getAll(): Promise<Subject[]> {

        //si se llama despues de la primera vez evita volver a obtener los datos
        if (this.subjects.length > 0) {
            return this.subjects;
        }

        const results = await CoursesModelDao.getCourses();
        for (const result of results) {
            //evita la duplicacion
            if (this.subjects.find(subject => ((subject.name === result.Asignatura) && (subject.degree === result.PE))) === undefined) {
                this.subjects.push(new Subject(result.Asignatura, result.Modelo, true, result.Tipo, result.PE, parseInt(result.Semestre)));
            }

        }
        return this.subjects;
    }


}