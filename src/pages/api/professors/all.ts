import { Professor } from "@/domain/entities/Professor";
import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { CourseCSV } from "@/infrastructure/models/CourseModel";

export const professors: Professor[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (professors.length > 0) {
        return res.status(200).json(professors);
    }

    const results = await CoursesModelDao.getCourses();
    let count = 0;

    for (const result of results) {
        if (findProfessor(result, professors) === undefined) {
            count++;
            professors.push(new Professor(count, result.Nombres, result.Apellidos));
        }
    }

    return res.status(200).json(professors);
}


export const findProfessor = (result: CourseCSV, professors: Professor[]): Professor | undefined => {
    return professors.find(
        (professor) =>
            professor.names === result.Nombres &&
            professor.lastNames === result.Apellidos
    ) 
}