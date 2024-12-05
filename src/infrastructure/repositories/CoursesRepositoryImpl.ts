import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Filter } from "@/domain/entities/Filter";
import { CoursesRepository } from "@/domain/repositories/CoursesRepository";

export class CoursesRepositoryImpl implements CoursesRepository {
  private _dataSource;

  constructor(dataSource: CoursesDataSource) {
    this._dataSource = dataSource;
  }
  getCoursesByFilter(filter: Filter): Promise<Course[]> {
    return this._dataSource.getCoursesByFilter(filter);
  }

  getAll(): Promise<Course[]> {
    return this._dataSource.getAll();
  }
}
