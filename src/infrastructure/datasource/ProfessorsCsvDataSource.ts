import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";
import { CoursesModelDao } from "./CoursesModelDAO";

export class ProfessorsCsvDataSource implements ProfessorsDataSource {
    private professors: Professor[] = [];

    async getAll(): Promise<Professor[]> {

        const results = await CoursesModelDao.getCourses();

        for (const result of results) {
            if (this.professors.find(professor => (professor.names === result.Nombres)) === undefined) {
                this.professors.push(new Professor(result.Nombres, result.Apellidos));

            }
        }

        return this.professors;
    }
}