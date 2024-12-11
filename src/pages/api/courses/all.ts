import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { Course } from "@/domain/entities/Course";
import { findProfessor, professors } from "../professors/all";
import { findSubject, subjects } from "../subjects/all";



const courses: Course[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const results = await CoursesModelDao.getCourses();
    let count = 0;

    for (const result of results) {
        const subject = findSubject(result, subjects);
        const professor = findProfessor(result, professors);

        if (subject && professor) {
            count++;
            courses.push(new Course(count, subject, professor, parseInt(result.GRUPO), result.Modalidad, parseFloat(result.Horas_a_la_semana), false));
        }

        
    }
    return res.status(200).json(courses);
}