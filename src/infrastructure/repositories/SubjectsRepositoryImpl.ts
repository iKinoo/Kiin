import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";
import { SubjectsRepository } from "@/domain/repositories/SubjectsRepository";


export class SubjectsRepositoryImpl implements SubjectsRepository {

    private _dataSource;

    constructor(dataSource: SubjectsDatasource) {
        this._dataSource = dataSource;

    }
    getAll(): Subject[] {
        return this._dataSource.getAll();
    }


}