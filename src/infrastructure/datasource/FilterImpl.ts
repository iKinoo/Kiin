import { Course } from "@/domain/entities/Course";
import { CoursesCsvDatasource } from "./CoursesCsvDatasource";
import { Filter } from "@/domain/entities/Filter";
import { CoursesRepositoryImpl } from "../repositories/CoursesRepositoryImpl";
import CourseFilter from "@/domain/entities/CourseFilter";

export class FilterImpl implements Filter {

  private _filters: CourseFilter[];
  constructor(
    filters: CourseFilter[]
  ) {
    this._filters = filters;
  }

  //union filter
  async filter(

  ) {
    const coursesDataSource = new CoursesRepositoryImpl(new CoursesCsvDatasource());
    const allCourses: Course[] = await coursesDataSource.getAll();
    const filtered: Course[] = allCourses.filter(course => 
      this._filters.every(filter => filter.satify(course))
    );
    return filtered;
  }
}