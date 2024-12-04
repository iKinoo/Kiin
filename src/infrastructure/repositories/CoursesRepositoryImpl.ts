import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Filter } from "@/domain/entities/Filter";
import { CoursesRepository } from "@/domain/repositories/CoursesRepository";

/**
 * Abstraccion del repositorio de cursos para usar un una clase fuente de cursos
 */
export class CoursesRepositoryImpl implements CoursesRepository {
  private _dataSource;

  constructor(dataSource: CoursesDataSource) {
    this._dataSource = dataSource;
  }
  /**
   * Filtra los cursos
   * @param filter filtro dado
   * @returns cursos filtrados
   */
  getCoursesByFilter(filter: Filter): Promise<Course[]> {
    return this._dataSource.getCoursesByFilter(filter);
  }

  /**
   * Busca todos los cursos
   * @returns todos los cursos encontrados
   */
  getAll(): Promise<Course[]> {
    return this._dataSource.getAll();
  }
}
