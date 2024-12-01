import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";
import { ProfessorsRepository } from "@/domain/repositories/ProfessorsRepository";

export class ProfessorsRepositoryImpl implements ProfessorsRepository {

    private _dataSource;

    constructor(dataSource: ProfessorsDataSource) {
        this._dataSource = dataSource;

    }
    getAll(): Professor[] {
        return this._dataSource.getAll();
    }


}