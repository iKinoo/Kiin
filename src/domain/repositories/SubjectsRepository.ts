import { Subject } from "../entities/Subject";


export interface SubjectsRepository {

    getAll(): Subject[];

}