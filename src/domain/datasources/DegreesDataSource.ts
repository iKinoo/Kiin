import { Degree } from "../entities/Degree";

export interface DegreesDataSource {
  getAll(): Promise<Degree[]>;
}
