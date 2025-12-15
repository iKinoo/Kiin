import { Course } from "./Course";
import { Schedule } from "./Schedule";
import { Session } from "./Session";


export class ScheduleGenerator {

    constructor() {

    }

    sessionCompatible(session1: Session, session2: Session): boolean {

        if (session1.day !== session2.day) {
            return true;
        }


        const noOverlap = session1.endHour <= session2.startHour || session1.startHour >= session2.endHour;
        return noOverlap;
    }
    courseCompatible(course1: Course, course2: Course) {
        for (const session1 of course1.sessions) {
            for (const session2 of course2.sessions) {
                if (!this.sessionCompatible(session1, session2)) {
                    return false;
                }
            }
        }
        return true;
    }

    generateSchedules(courses: Course[]) {
        const schedules: Schedule[] = [];

        for (const course of courses) {
            const compatibleSchedules = schedules.filter((schedule) =>
                schedule.courses.every(scheduledCourse =>
                    this.courseCompatible(course, scheduledCourse) &&
                    scheduledCourse.subject.id !== course.subject.id
                )
            );

            for (const compatibleSchedule of compatibleSchedules) {
                const newSchedule = new Schedule(99);
                newSchedule.courses = [...compatibleSchedule.courses, course];

                // Agregar cursos incompatibles (excluyendo cursos de la misma materia)
                const subjectsInSchedule = newSchedule.courses.map(c => c.subject.id);
                const incompatibleCourses = courses.filter(c =>
                    !newSchedule.courses.includes(c) &&
                    !subjectsInSchedule.includes(c.subject.id) &&
                    (!this.courseCompatible(course, c) || newSchedule.courses.some(sc => !this.courseCompatible(sc, c)))
                );
                newSchedule.incompatibleCourses = incompatibleCourses;

                schedules.push(newSchedule);
            }

            // Cada curso puede ser un horario por sí mismo
            const newSchedule = new Schedule(99);
            newSchedule.courses = [course];

            // Agregar cursos incompatibles para horarios de un solo curso (excluyendo cursos de la misma materia)
            const incompatibleCourses = courses.filter(c =>
                c !== course &&
                c.subject.id !== course.subject.id &&
                !this.courseCompatible(course, c)
            );
            newSchedule.incompatibleCourses = incompatibleCourses;

            schedules.push(newSchedule);
        }

        return schedules;
    }
}