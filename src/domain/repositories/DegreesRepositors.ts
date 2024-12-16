import { Degree } from "../entities/Degree";

export interface DegreesRepository {

    getAll(): Promise<Degree[]>;

}