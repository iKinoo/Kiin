import { Course } from "@/domain/entities/Course";
import { Subject } from "@/domain/entities/Subject";
import { CoursesCsvDatasource } from "./CoursesCsvDatasource";
import { Filter } from "@/domain/entities/Filter";
import { CoursesRepositoryImpl } from "../repositories/CoursesRepositoryImpl";
import FilterModel from "../models/FilterModel";
/**
 * Implementacion de los tipos de filtrado desde la ORM propia
 */
export class FilterImpl implements Filter {

  private _model: FilterModel;
  constructor(
    model: FilterModel
  ) {
    this._model = model;
  }

  /**
   * union de los filtros para su funcionamiento asíncrono
   * @returns cursos recopilados
   */
  async filter(

  ) {
    const coursesDataSource = new CoursesRepositoryImpl(new CoursesCsvDatasource());
    const allCourses: Course[] = await coursesDataSource.getAll();
    const filtered: Course[] = [];

    const degreeFiltered = this.filterByDegree(allCourses, this._model.degrees[0]);
    const semesterFiltered = this.filterBySemester(degreeFiltered, this._model.semesters[0]);

    filtered.push(...semesterFiltered);
    return filtered;
  }

  /**
   * Un curso concuerda con las materias solicitadas
   * @param course curso a analizar
   * @param degrees materias a comparar
   * @returns verdadero si concuerda alguna
   */
  matchDegree(course: Course, degrees: string[]): boolean {
    for (const degree of degrees) {
      if (course.subject.degrees.includes(degree)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Un curso concuerda con los semestres solicitado
   * @param course curso a analizar
   * @param semesters semestres a comparar
   * @returns verdadero si concuerda alguno
   */
  matchSemester(course: Course, semesters: number[]): boolean {
    for (const semester of semesters) {
      if (course.subject.semestre == semester) {
        return true;
      }
    }
    return false;
  }

  /**
   * Un curso concuerda con los maetros solicitados
   * @param course curso a analizar
   * @param professors maestros a comparar
   * @returns verdadero si concuerda alguno
   */
  matchProfessor(course: Course, professors: string[]): boolean {
    for (const professor of professors) {
      if (course.professor.fullName() == professor) {
        return true;
      }
    }
    return false;
  }

  /**
   * Un curso concuerda con las materias solicitadas
   * @param course curso a analizar
   * @param subjects maestros a comparar
   * @returns verdadero si concuerda alguno
   */
  matchSubjects(course: Course, subjects: string[]): boolean {
    for (const subject of subjects) {
      if (course.subject.name == subject) {
        return true;
      }
    }
    return false;
  }

  /**
   * Filtra cursos segun su modalidad
   * @param list cursos a filtrar
   * @param value modalidad que va a filtrar
   * @returns cursos de una modalidad
   */
  filterByModality(list: Course[], value: string): Course[] {
    return list.filter((course) => course.modality === value);
  }
  /**
   * Filtra cursos segun algun atributo de su materia
   * @param list cursos a filtrar
   * @param atributte atributo del cual comparar
   * @param value valor que va a filtrar
   * @returns cursos que cumplen el filtro
   */
  filterBySubjectAtributte(
    list: Course[],
    atributte: keyof Subject,
    value: string
  ): Course[] {
    return list.filter((course) => course.subject[atributte] == value);
  }

  /**
   * filtra cursos segun el profesor
   * @param list cursos a filtrar
   * @param value nombre del profesor que va a filtrar
   * @returns cursos que imparte el profesor dado
   */
  filterByProfessor(list: Course[], value: string) {
    return list.filter((course) => course.professor.fullName() == value);
  }

  /**
   * filtra cursos segun la materia
   * @param list cursos a filtrar
   * @param value nombre de la materia que va a filtrar
   * @returns cursos de una materia
   */
  filterBySubjects(list: Course[], value: string) {
    return list.filter((course) => {
      const degrees = course.subject.degrees;
      return degrees.includes(value);
    });
  }

  /**
   * filtra cursos segun el semestre
   * @param list cursos a filtrar
   * @param value nombre del semestre que va a filtrar
   * @returns cursos de un semestre dado
   */
  filterBySemester(list: Course[], value: number) {
    return list.filter((course) => course.subject.semestre == value);
  }

  /**
   * filtra cursos segun el la carrera
   * @param list cursos a filtrar
   * @param value nombre de a carrera que va a filtrar
   * @returns cursos de una carrera dada
   */
  filterByDegree(list: Course[], value: string) {
    return list.filter((course) => course.subject.degrees.includes(value));
  }
}
