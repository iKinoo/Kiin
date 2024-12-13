import { CoursesDataSource } from "@/domain/datasources/CoursesDataSource";
import { Course } from "@/domain/entities/Course";
import { Filter } from "@/domain/entities/Filter";
import { Mapper } from "../mappers/Mapper";


export class CoursesCsvDatasource implements CoursesDataSource {

    private courses: Course[] = [];


    async getAll(): Promise<Course[]> {

        if (this.courses.length > 0) {
            return this.courses;
        }

        const response = await fetch('/api/courses/all');

        this.courses = Mapper.toCourses(await response.json());
        console.log(this.courses);
        return this.courses;
    }

    async getCoursesByFilter(filter: Filter): Promise<Course[]> {
        return filter.filter(await this.getAll());
    }


}