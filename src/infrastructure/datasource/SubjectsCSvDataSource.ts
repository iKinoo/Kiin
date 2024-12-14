import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";
import { Mapper } from "../mappers/Mapper";

export class SubjectsCsvDataSource implements SubjectsDatasource {
    private subjects: Subject[] = [];


    async getAll(): Promise<Subject[]> {

        if (this.subjects.length > 0) {
            return this.subjects;
        }

        const response = await fetch('/api/subjects/all');
        this.subjects = Mapper.toSubjects(await response.json());

        return this.subjects;
    }


}