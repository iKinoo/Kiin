import { CourseCSV } from "../../models/CourseModel";

/**
 * Objeto de Acceso a Datos para obtencion de cursos
 */
export class CoursesModelDao {
  private static _results: CourseCSV[] = [];

  static async getCourses(): Promise<CourseCSV[]> {
    if (this._results.length > 0) {
      return this._results;
    }

    const response = await fetch('/api/courses');
    /* Url for testing
    const response = await fetch('http://localhost:3000/api/courses');
    */
    if (!response.ok) {
      console.error('Error fetching courses:', response.statusText);
      return [];
    }

    this._results = await response.json();
    return this._results;
  }
}
