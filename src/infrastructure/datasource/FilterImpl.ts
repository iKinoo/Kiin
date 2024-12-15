import { Course } from "@/domain/entities/Course";
import { CoursesCsvDatasource } from "./CoursesCsvDatasource";
import { Filter } from "@/domain/entities/Filter";
import { CoursesRepositoryImpl } from "../repositories/CoursesRepositoryImpl";
import FilterModel from "../models/FilterModel";

export class FilterImpl implements Filter {

  private _model: FilterModel;
  constructor(
    model: FilterModel
  ) {
    this._model = model;
  }

  //union filter
  async filter(

  ) {
    const coursesDataSource = new CoursesRepositoryImpl(new CoursesCsvDatasource());
    const allCourses: Course[] = await coursesDataSource.getAll();
    const filtered: Course[] = allCourses.filter(course => 
      this._model.getFilters().every(filter => 
        filter.satify(course)
      )
    );
    return filtered;
  }
}