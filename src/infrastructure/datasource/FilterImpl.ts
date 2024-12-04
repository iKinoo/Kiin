import { Course } from "@/domain/entities/Course";
import { Subject } from "@/domain/entities/Subject";
import { CoursesCsvDatasource } from "./CoursesCsvDatasource";
import { Filter } from "@/domain/entities/Filter";
import { CoursesRepositoryImpl } from "../repositories/CoursesRepositoryImpl";

export class FilterImpl implements Filter {

  private _degrees: string[];
  private _semesters: number[];
  private _professors: string[];
  private _subjects: string[];

  constructor(
    degrees: string[],
    semesters: number[],
    professors: string[],
    subjects: string[]
  ) {
    this._degrees = degrees;
    this._semesters = semesters;
    this._professors = professors;
    this._subjects = subjects
  }

  //union filter
  async filter(

  ) {
    const coursesDataSource = new CoursesRepositoryImpl(new CoursesCsvDatasource());
    const allCourses: Course[] = await coursesDataSource.getAll();
    const filtered: Course[] = [];

    const degreeFiltered = this.filterByDegree(allCourses, this._degrees[0]);
    const semesterFiltered = this.filterBySemester(degreeFiltered, this._semesters[0]);

    filtered.push(...semesterFiltered);


    return filtered;
  }

  matchDegree(course: Course, degrees: string[]): boolean {
    for (const degree of degrees) {
      if (course.subject.degrees.includes(degree)) {
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
    return list.filter((course) => {
      const degrees = course.subject.degrees;
      return degrees.includes(value);
    });
  }
  filterBySemester(list: Course[], value: number) {
    return list.filter((course) => course.subject.semestre == value);
  }
  filterByDegree(list: Course[], value: string) {
    return list.filter((course) => course.subject.degrees.includes(value));
  }
}
