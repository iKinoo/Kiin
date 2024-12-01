import { Subject } from "../entities/Subject";


export interface SubjectsDatasource {

    getAll(): Subject[];

}