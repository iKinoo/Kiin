import { Course } from "./Course";
import CourseFilter from "./CourseFiltert";
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
        const isSameSubject = course1.subject === course2.subject
        if (!isSameSubject) {
            return false;
        }
        for (const session1 of course1.sessions) {
            for (const session2 of course2.sessions) {
                if (!this.sessionCompatible(session1, session2) ) {
                    return false;
                }
            }
        }
        return true;
    }
    
    generateSchedules(courses: Course[], filters: CourseFilter[]) {
        const schedules: Course[][] = [];
        let bestSchedule: Course[] = [];

        const backtrack = (currentSchedule: Course[], index: number) => {
            if (index === courses.length) {
                if (currentSchedule.length > bestSchedule.length) {
                    bestSchedule = [...currentSchedule];
                }
                schedules.push([...currentSchedule]);
                return;
            }
            
            backtrack(currentSchedule, index + 1);

            const currentCourse = courses[index];
            if (
                currentSchedule.every((course) => this.courseCompatible(course, currentCourse)) &&
                filters.every((filter) => filter.satify(currentCourse))
            ) {
                backtrack([...currentSchedule, currentCourse], index + 1);
            }
        }

        backtrack([], 0);
        schedules.splice(0, 1);
        return schedules;
        
    }

}