import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Professor } from "@/domain/entities/Professor";
import { Subject } from "@/domain/entities/Subject";

export class CoursesCsvDatasource implements CoursesDataSource {

    getAll(): Course[] {
        const courses: Course[] = [];

        courses.push(new Course(new Subject(), new Professor(), [], 2, ""));
        courses.push(new Course());
        courses.push(new Course());
        courses.push(new Course());

        return courses;
        
    }
}