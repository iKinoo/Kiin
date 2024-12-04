import { DegreesDataSource } from "@/domain/datasources/DegreesDataSource";
import { Degree } from "@/domain/entities/Degree";
import { CoursesModelDao } from "./data/CoursesModelDAO";

export class DegreesCsvDataSource implements DegreesDataSource {

    private _degrees: Degree[] = [];

    async getAll(): Promise<Degree[]> {

        const results = await CoursesModelDao.getCourses();

        for (const res of results) {
            const degreesCsv = res.PE.split("-");

            for (const degree of degreesCsv) {
                if (!this._degrees.find(d => d.name === degree)) {
                    this._degrees.push(new Degree(degree, []));
                }
            }
        }
        return this._degrees;
    }
}