import { CourseCSV } from "../../models/CourseModel";

export class CoursesModelDao {
  private static _results: CourseCSV[] = [];

  static async getCourses(): Promise<CourseCSV[]> {
    if (this._results.length > 0) {
      return this._results;
    }

    const response = await fetch('/api/courses');
    if (!response.ok) {
      console.error('Error fetching courses:', response.statusText);
      return [];
    }

    this._results = await response.json();
    return this._results;
  }
}
