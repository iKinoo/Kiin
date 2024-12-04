import { ProfessorsDataSource } from "@/domain/datasources/ProfessorsDataSource";
import { Professor } from "@/domain/entities/Professor";
import { ProfessorsRepository } from "@/domain/repositories/ProfessorsRepository";

/**
 * Abstraccion del repositorio de profesores para usar un una clase fuente de profesores
 */
export class ProfessorsRepositoryImpl implements ProfessorsRepository {

    private _dataSource;

    constructor(dataSource: ProfessorsDataSource) {
        this._dataSource = dataSource;

    }

    /**
     * Busca todos los profesores
     * @returns todos los profesores encontrados
     */
    getAll(): Promise<Professor[]> {
        return this._dataSource.getAll();
    }


}