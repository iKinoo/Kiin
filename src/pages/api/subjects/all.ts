import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { CourseCSV } from "@/infrastructure/models/CourseModel";
import { Subject } from "@/domain/entities/Subject";


export const subjects: Subject[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const results = await CoursesModelDao.getCourses();
    let count = 0;

    for (const result of results) {
        if (findSubject(result, subjects) === undefined) {
            count++;
            
            subjects.push(new Subject(count, result.Asignatura, result.PE, result.Modelo, result.Tipo, parseInt(result.Semestre)));
        }
    }

    return res.status(200).json(subjects);
}


export const findSubject = (result: CourseCSV, subjects: Subject[]): Subject | undefined => {
    return subjects.find(
        (subject) =>
            subject.name === result.Asignatura &&
            subject.degreeResume === result.PE
    )
}