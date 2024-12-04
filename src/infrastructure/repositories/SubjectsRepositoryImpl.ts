import { SubjectsDatasource } from "@/domain/datasources/SubjectsDataSource";
import { Subject } from "@/domain/entities/Subject";
import { SubjectsRepository } from "@/domain/repositories/SubjectsRepository";

/**
 * Abstraccion del repositorio de materias para usar un una clase fuente de materias
 */
export class SubjectsRepositoryImpl implements SubjectsRepository {

    private _dataSource;

    constructor(dataSource: SubjectsDatasource) {
        this._dataSource = dataSource;

    }

    /**
     * Busca todas las materias
     * @returns todas las materias encontradas
     */
    getAll(): Promise<Subject[]> {
        return this._dataSource.getAll();
    }


}