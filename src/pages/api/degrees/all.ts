import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { Degree } from "@/domain/entities/Degree";
import { globalInitialLoad } from "../data/initialLoad";

export class Degrees {
    private static _degrees: Degree[] = [];

    public static get degrees(): Degree[] {
        return Degrees._degrees;
    }
    public static set degrees(value: Degree[]) {
        Degrees._degrees = value;
    }

    public static async initialLoad() {

        const results = await CoursesModelDao.getCourses();
        let count = 0;

        for (const result of results) {
            
            const degreesResultCsv = result.PE.split("-");

            degreesResultCsv.forEach((degreeString) => {
                if (this.findDegree(degreeString.trim()) === undefined) {
                    count++;
                    this.degrees.push(new Degree(count, degreeString.trim() == "" ? "Unknown" : degreeString.trim()));
                }
            });

        }
    }

    public static findDegree(degreeCourseCSV: string): Degree | undefined {
        return this.degrees.find(
            (degree) =>
                degree.name === degreeCourseCSV
        )
    }

    public static async getAll() {

        if (this._degrees.length === 0) {
            await globalInitialLoad();
        }

        return this.degrees;
    }


}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const degrees = await Degrees.getAll()

    return res.status(200).json(degrees);
}


