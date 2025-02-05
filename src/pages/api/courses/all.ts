import { NextApiRequest, NextApiResponse } from "next";
import { CoursesModelDao } from "../data/CoursesModelDAO";
import { Course } from "@/domain/entities/Course";
import { globalInitialLoad } from "../data/initialLoad";
import { CourseMapper } from "../data/CourseMapper";


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
        let count = 1;

        for (const result of results) {
            const currentCourse = CourseMapper.fromModelToEntity(count, result);

            const courseAlreadyExist = this.courses.find((course) => course.subject.id == currentCourse.subject.id && course.group == currentCourse.group)

            if (!courseAlreadyExist) {
                this.courses.push(currentCourse);
                count++;
            }else{
                courseAlreadyExist.addSession(currentCourse.sessions[0]);
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