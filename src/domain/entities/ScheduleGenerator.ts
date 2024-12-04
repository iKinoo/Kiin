import { Course } from "./Course";
import { Session } from "./Session";

/**
 * clase con metodos para generar horarios en base a la compatibilidad de sesiones de clase
 */
export class ScheduleGenerator {

    constructor() {

    }

    /**
     * una sesion de clases es compatible con otra, es decir, sus horarios no interfieren
     * @param session1 sesion a comparar
     * @param session2 sesion a comparar
     * @returns verdadero si es compatible, falso si no
     */
    sessionCompatible(session1: Session, session2: Session): boolean {

        if (session1.day !== session2.day) {
            return true;
        }


        const noOverlap = session1.endHour <= session2.startHour || session1.startHour >= session2.endHour;
        return noOverlap;
    }

    /**
     * un curso de una materia es compatible con otro, es decir, sus sesiones no interfieren
     * @param course1 curso a comparar
     * @param course2 curso a comparar
     * @returns verdadero si es compatible, falso si no
     */
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

    /**
     * Generacion de horarios con cursos compatibles
     * @param courses cursos que tendran los horarios
     * @returns horarios generados sin interferencia entre sesiones
     */
    generateSchedules(courses: Course[]) {
        const schedules: Course[][] = [];
    
        for (const course of courses) {
            const compatibleSchedules = schedules.filter((schedule) =>
                schedule.every(scheduledCourse => 
                    this.courseCompatible(course, scheduledCourse) && 
                    scheduledCourse.subject !== course.subject
                )
            );
    
            for (const compatibleSchedule of compatibleSchedules) {
                schedules.push([...compatibleSchedule, course]);
            }
    
            // Cada curso puede ser un horario por sí mismo
            schedules.push([course]);
        }
    
        return schedules;
    }
    




}