import { CoursesCsvDatasource } from '../infrastructure/datasource/CoursesCsvDatasource';
import { Course } from '../domain/entities/Course';
import fetchMock from 'jest-fetch-mock';
jest.mock('node-fetch');

describe('Session Tests', () => {
  let courseImporter: CoursesCsvDatasource;
  let courses:  Course[];

    beforeEach(async () => {
      fetchMock.resetMocks();
      courseImporter = new CoursesCsvDatasource();
      courses = await courseImporter.getAllCourses();
    });
    it('Session should have a start time', async () => { 
        for(const course of courses ){
            for(const session of course.sessions){
                expect(session.startHour).not.toBeNull();
            }
        }
    });
  
    it('Session should have an end time', async () => {
      for(const course of courses ){
        for(const session of course.sessions){
            expect(session.endHour).not.toBeNull();
        }
    } 
    });

    it('End time should be after start time', async () => {
      for(const course of courses ){
        for(const session of course.sessions){
            expect(Number(session.endHour.hour())).toBeGreaterThan(Number(session.startHour.hour()));
        }
    } 
      });
});
  