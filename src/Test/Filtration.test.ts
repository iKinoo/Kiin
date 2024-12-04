import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import fetchMock from 'jest-fetch-mock';
import { Course } from "../domain/entities/Course";
import { ProfessorsCsvDataSource } from "@/infrastructure/datasource/ProfessorsCsvDataSource";
import { Filtration } from "@/infrastructure/datasource/CourseFiltration";
import { SubjectsCsvDataSource } from "@/infrastructure/datasource/SubjectsCSvDataSource";
jest.mock('node-fetch');


describe('Filtration Tests', () => {
  let courseImporter: CoursesCsvDatasource;
  let courses:  Course[];
  let filter : Filtration;

    beforeEach(async () => {
      fetchMock.resetMocks();
      filter = new Filtration();
      courseImporter = new CoursesCsvDatasource();
      courses = await courseImporter.getAll();
    });

    it('Filter by professor', async () => {
      const professor = new ProfessorsCsvDataSource();
      const professors = await professor.getAll(); 
    
      for(const professor of professors){
        let validName = professor.fullName();
        const filteredCourses = filter.filterByProfessor(courses, validName);
        for(const course of filteredCourses){
          expect(course.professor.fullName()).toBe(validName);
        }
      }
    });

    it('Filter by modality', async () => {
      const modalities = ["Presencial", "Acompañamiento", "Ordinario"];
    
      for(const modality of modalities){
        let validName = modality;
        const filteredCourses = filter.filterBySubjects(courses, validName);
        for(const course of filteredCourses){
          expect(course.subject.name).toBe(validName);
        }
      }
    });

    it('Filter by subject', async () => {
      const subjectImporter = new SubjectsCsvDataSource();
      const subjects = await subjectImporter.getAll(); 
    
      for(const subject of subjects){
        let validName = subject.name;
        const filteredCourses = filter.filterBySubjects(courses, validName);
        for(const course of filteredCourses){
          expect(course.subject.name).toBe(validName);
        }
      }
    });
});
  