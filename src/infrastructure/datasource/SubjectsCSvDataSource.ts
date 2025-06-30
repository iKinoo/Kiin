import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";
import { Mapper } from "../mappers/Mapper";

export class SubjectsCsvDataSource implements SubjectsDatasource {
  private subjects: Subject[] = [];

  async getAll(): Promise<Subject[]> {
    if (this.subjects.length > 0) {
      return this.subjects;
    }


    const res = await fetch("/api/version");
    const versionDeLaAPI = await res.json();

    const storedData = localStorage.getItem("subject-info-" + versionDeLaAPI);

    if (storedData) {
      console.log("Asignaturas recuperados de local storage");
      const convertedSubjects = Mapper.toSubjects(JSON.parse(storedData));
      const subjects = convertedSubjects as Subject[];

      this.subjects = subjects;
    } else {
      // Eliminar la informacion desactualizada
      Object.keys(localStorage)
        .filter(key => key.startsWith("subject-info-"))
        .forEach(key => localStorage.removeItem(key));

      console.log("Asignaturas recuperados de la API");
      const response = await fetch("/api/subjects/all");

      const convertedSubjects = Mapper.toSubjects(await response.json());
      const subjects = convertedSubjects as Subject[];

      this.subjects = subjects;

      localStorage.setItem(
        "subject-info-" + versionDeLaAPI,
        JSON.stringify(this.subjects),
      );
    }

    return this.subjects;
  }
}
