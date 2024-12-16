import { DegreesDataSource } from "@/domain/datasources/DegreesDataSource";
import { Degree } from "@/domain/entities/Degree";
import { DegreesRepository } from "@/domain/repositories/DegreesRepositors";

export class DegreesRepositoryImpl implements DegreesRepository {

    private _dataSource;

    constructor(dataSource: DegreesDataSource) {
        this._dataSource = dataSource;

    }
    getAll(): Promise<Degree[]> {
        return this._dataSource.getAll();
    }


}