import { Course } from "@/domain/entities/Course";
import { CourseCSV } from "@/infrastructure/models/CourseModel";
import { Subjects } from "../subjects/all";
import { Professors } from "../professors/all";
import moment from "moment";
import { Session } from "@/domain/entities/Session";

export class CourseMapper {

    public static fromModelToEntity(id: number, model: CourseCSV): Course {

        const subject = Subjects.findSubject(model);
        const professor = Professors.findProfessor(model);

        if (!subject || !professor) {
            throw new Error("Subject or professor not found");
        }

        const course = new Course(
            id,
            subject,
            professor,
            parseInt(model.GRUPO),
            model.Modalidad,
            parseFloat(model.Horas_a_la_semana),
            false
        );

        course.sessions = this.getSessions(model);

        return course;
    }
    private static getSessions(result: CourseCSV): Session[] {

        const sessions: Session[] = [];

        const days = new Map<keyof CourseCSV, keyof CourseCSV>([
            ["Lunes", "Aula1"],
            ["Martes", "Aula2"],
            ["Miercoles", "Aula3"],
            ["Jueves", "Aula4"],
            ["Viernes", "Aula5"],
        ]);

        for (const day of days) {
            if (!result[day[0]]) {
                continue;
            }
            const hours = this.getHours(result[day[0]]);
            const session = new Session(day[0], hours[0], hours[1], result[day[1]]);
            sessions.push(session);
        }

        return sessions;
    }
    private static getHours(time: string): moment.Moment[] {
        const hours = time.split('-');
        if (hours.length === 2) {
            return [moment(hours[0], 'HH:mm'), moment(hours[1], 'HH:mm')];
        }
        return [moment(), moment()];
    }
}