import { Courses } from "../courses/all";
import { Degrees } from "../degrees/all";
import { Professors } from "../professors/all";
import { Subjects } from "../subjects/all";

// Tell Next.js this is not an API route
export const config = {
    api: {
        externalResolver: true,
    },
};

export async function globalInitialLoad() {


    await Degrees.initialLoad();
    await Subjects.initialLoad();
    await Professors.initialLoad();
    await Courses.initialLoad();

    const courses = Courses.courses;

    for (const course of courses) {

        const subject = course.subject;

        subject.addCourse(course.id);

        const professor = course.professor;

        if (subject.professors.find(professorId => professorId === professor.id) === undefined) {
            subject.addProfessor(professor.id);
        }
    }




}