import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { CoursesModelDao } from "./data/CoursesModelDAO";
import { ProfessorsRepositoryImpl } from "../repositories/ProfessorsRepositoryImpl";
import { ProfessorsCsvDataSource } from "./ProfessorsCsvDataSource";
import { SubjectsRepositoryImpl } from "../repositories/SubjectsRepositoryImpl";
import { SubjectsCsvDataSource } from "./SubjectsCSvDataSource";
import { Session } from "@/domain/entities/Session";
import { ProfessorsRepository } from "@/domain/repositories/ProfessorsRepository";
import { SubjectsRepository } from "@/domain/repositories/SubjectsRepository";
import { CourseCSV } from "../models/CourseModel";
import moment from "moment";
import { Filter } from "@/domain/entities/Filter";


export class CoursesCsvDatasource implements CoursesDataSource {

    private courses: Course[] = [];
    private professorsRepository: ProfessorsRepository = new ProfessorsRepositoryImpl(new ProfessorsCsvDataSource());
    private subjectsRepository: SubjectsRepository = new SubjectsRepositoryImpl(new SubjectsCsvDataSource());


    async getAll(): Promise<Course[]> {

        if (this.courses.length > 0) {
            return this.courses;
        }

        const results = await CoursesModelDao.getCourses();
        const professors = await this.professorsRepository.getAll();
        const subjects = await this.subjectsRepository.getAll();


        for (const result of results) {

            const professor = professors.find(professor => (
                (professor.names === result.Nombres) && (professor.lastNames === result.Apellidos)
            ));

            const subject = subjects.find(subject => (
                subject.name === result.Asignatura
            ));

            const sessions = this.getSessions(result);


            if (professor && subject) {

                const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                this.courses.push(new Course(subject, professor, sessions, parseInt(result.GRUPO), result.Modalidad, color));
            }


        }

        return this.courses;
    }

    async getCoursesByFilter(filter: Filter): Promise<Course[]> {
        return filter.filter(await this.getAll());
    }

    getSessions(result: CourseCSV): Session[] {

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

    getHours(time: string): moment.Moment[] {
        const hours = time.split('-');
        if (hours.length === 2) {
            return [moment(hours[0], 'HH:mm'), moment(hours[1], 'HH:mm')];
        }
        return [moment(), moment()];
    }



}