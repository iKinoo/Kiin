import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";
import { Mapper } from "../mappers/Mapper";

export class SubjectsCsvDataSource implements SubjectsDatasource {
    private subjects: Subject[] = [];


    async getAll(): Promise<Subject[]> {

        if (this.subjects.length > 0) {
              return this.subjects;
            }
        
            const storedData = localStorage.getItem("subject-info");
        
            if (storedData) {
              console.log("Asignaturas recuperados de local storage");
              const convertedSubjects = Mapper.toSubjects(JSON.parse(storedData));
              const subjects = convertedSubjects as Subject[];
        
              this.subjects = subjects;
            } else {
              console.log("Asignaturas recuperados de la API");
              const response = await fetch("/api/subjects/all");
        
              const convertedSubjects = Mapper.toSubjects(await response.json());
              const subjects = convertedSubjects as Subject[];
        
              this.subjects = subjects;
        
              localStorage.setItem("subject-info", JSON.stringify(this.subjects));
            }
        
            return this.subjects;
    }


}