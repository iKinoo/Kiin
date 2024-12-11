import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { Degree } from "@/domain/entities/Degree";

const degrees: Degree[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 
    const results = await CoursesModelDao.getCourses();
    let count = 0;

    for (const result of results) {
        const degreesResultCsv = result.PE.split("-");
        
        degreesResultCsv.forEach((degreeString) => {
            if (findDegree(degreeString.trim(), degrees)) {
                count++;
                degrees.push(new Degree(count, degreeString.trim() == "" ? "Unknown" : degreeString.trim()));
            }
        });

    }

    return res.status(200).json(degrees);
}


const findDegree = (degreeCourseCSV: string, degrees: Degree[]): boolean => {
    return (
        degrees.find(
            (degree) =>
                degree.name === degreeCourseCSV
        ) === undefined
    );
}