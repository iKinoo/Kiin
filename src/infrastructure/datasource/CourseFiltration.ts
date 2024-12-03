import { Course } from "@/domain/entities/Course";
import { Subject } from "@/domain/entities/Subject";
import { CoursesCsvDatasource } from "./CoursesCsvDatasource";

export class Filtration {
  //union filter
  async filter(
    degrees: string[],
    semesters: number[],
    professors: string[],
    subjects: string[]
  ) {
    const coursesDataSource = new CoursesCsvDatasource();
    const allCourses: Course[] = await coursesDataSource.getAll();
    const filtered: Course[] = [];
    for (const course of allCourses) {
      if (
        this.matchDegree(course, degrees) ||
        this.matchSemester(course, semesters) ||
        this.matchProfessor(course, professors) ||
        this.matchSubjects(course, subjects)
      ) {
        filtered.push(course);
      }
    }
    return filtered;
  }

  matchDegree(course: Course, degrees: string[]): boolean {
    for (const degree of degrees) {
      if (course.subject.degree == degree) {
        return true;
      }
    }
    return false;
  }
  matchSemester(course: Course, semesters: number[]): boolean {
    for (const semester of semesters) {
      if (course.subject.semestre == semester) {
        return true;
      }
    }
    return false;
  }
  matchProfessor(course: Course, professors: string[]): boolean {
    for (const professor of professors) {
      if (course.professor.fullName() == professor) {
        return true;
      }
    }
    return false;
  }
  matchSubjects(course: Course, subjects: string[]): boolean {
    for (const subject of subjects) {
      if (course.subject.name == subject) {
        return true;
      }
    }
    return false;
  }

  //intersection filters
  filterByModality(list: Course[], value: string): Course[] {
    return list.filter((course) => course.modality === value);
  }
  filterBySubjectAtributte(
    list: Course[],
    atributte: keyof Subject,
    value: string
  ): Course[] {
    return list.filter((course) => course.subject[atributte] == value);
  }
  filterByProfessor(list: Course[], value: string) {
    return list.filter((course) => course.professor.fullName() == value);
  }
  filterBySubjects(list: Course[], value: string) {
    return list.filter((course) => course.subject.name == value);
  }
}
