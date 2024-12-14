/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from "@/domain/entities/Course";
import { Professor } from "@/domain/entities/Professor";
import { Session } from "@/domain/entities/Session";
import { Subject } from "@/domain/entities/Subject";
import moment from "moment";


export class Mapper {



    static toSubject(json: any): Subject {
        return new Subject(
            json._id,
            json._name,
            json._degreeResume,
            json._model,
            json._type,
            json._semesters
        );
    }

    static toSubjects(jsonArray: any[]): Subject[] {
        return jsonArray.map(json => Mapper.toSubject(json));
    }

    static toProfessor(json: any): Professor {
        return new Professor(
            json._id,
            json._names,
            json._lastNames
        );
    }

    static toProfessors(jsonArray: any[]): Professor[] {
        return jsonArray.map(json => Mapper.toProfessor(json));
    }

    static toSession(json: any): Session {
        return new Session(
            json._day,
            moment(json._startHour),
            moment(json._endHour),
            json._room
        );
    }

    static toCourse(json: any): Course {
        const subject = Mapper.toSubject(json._subject);
        const professor = Mapper.toProfessor(json._professor);
        const sessions = json._sessions.map((sessionJson: any) => Mapper.toSession(sessionJson));
        const course = new Course(
            json._id,
            subject,
            professor,
            json._group,
            json._modality,
            json._weekHours,
            json._acceptModifications
        );
        course.sessions = sessions;
        return course;
    }

    static toCourses(jsonArray: any[]): Course[] {
        return jsonArray.map(json => Mapper.toCourse(json));
    }
}