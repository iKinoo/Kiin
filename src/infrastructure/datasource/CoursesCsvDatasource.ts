import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Filter } from "@/domain/entities/Filter";
import { Mapper } from "../mappers/Mapper";

// Este archivo se encuentra del lado del cliente

export class CoursesCsvDatasource implements CoursesDataSource {
  private courses: Course[] = [];

  async getAll(): Promise<Course[]> {
    if (this.courses.length > 0) {
      return this.courses;
    }

    // Eliminar la informacion desactualizada
    localStorage.removeItem("course-info");

    const res = await fetch("/api/version");
    const versionDeLaAPI = await res.json();

    const storedData = localStorage.getItem("course-info-" + versionDeLaAPI);

    if (storedData) {
      console.log("Cursos recuperados de local storage");
      const convertedCourses = Mapper.toCourses(JSON.parse(storedData));
      const courses = convertedCourses as Course[];

      this.courses = courses;
    } else {
      console.log("Cursos recuperados de la API");
      const response = await fetch("/api/courses/all");

      const convertedCourses = Mapper.toCourses(await response.json());
      const courses = convertedCourses as Course[];

      this.courses = courses;

      localStorage.setItem(
        "course-info-" + versionDeLaAPI,
        JSON.stringify(this.courses),
      );
    }

    return this.courses;
  }

  async getCoursesByFilter(filter: Filter): Promise<Course[]> {
    return filter.filter(await this.getAll());
  }
}
