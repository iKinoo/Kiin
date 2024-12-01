import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { CoursesRepository } from "@/domain/repositories/CoursesRepository";

export class CoursesRepositoryImpl implements CoursesRepository {

    private _dataSource;

    constructor(dataSource: CoursesDataSource) {
        this._dataSource = dataSource;

    }

    getAll(): Promise<Course[]> {
        return this._dataSource.getAll();
    }
}