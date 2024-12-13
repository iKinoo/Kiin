import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { Course } from "@/domain/entities/Course";
import { Subjects } from "../subjects/all";
import { Professors } from "../professors/all";
import { globalInitialLoad } from "../data/initialLoad";


export class Courses {

    private static _courses: Course[] = [];
    public static get courses(): Course[] {
        return Courses._courses;
    }
    public static set courses(value: Course[]) {
        Courses._courses = value;
    }

    public static async initialLoad() {

        const results = await CoursesModelDao.getCourses();
        let count = 0;

        for (const result of results) {
            const subject = Subjects.findSubject(result);
            const professor = Professors.findProfessor(result);

            if (subject && professor) {
                count++;
                this.courses.push(new Course(count, subject, professor, parseInt(result.GRUPO), result.Modalidad, parseFloat(result.Horas_a_la_semana), false));
            }
        }
    }

    public static async getAll() {
        
        if (this._courses.length === 0) {
            await globalInitialLoad();
        }

        return this.courses;
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const courses = await Courses.getAll()

    return res.status(200).json(courses);
}