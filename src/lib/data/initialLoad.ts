import { Courses } from "@/pages/api/courses/all";
import { Degrees } from "@/pages/api/degrees/all";
import { Professors } from "@/pages/api/professors/all";
import { Subjects } from "@/pages/api/subjects/all";

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