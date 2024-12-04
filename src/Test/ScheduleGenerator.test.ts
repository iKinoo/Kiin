import { ScheduleGenerator } from "@/domain/entities/ScheduleGenerator";
import fetchMock from 'jest-fetch-mock';
import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import { Course } from "@/domain/entities/Course";
import { FilterImpl } from "@/infrastructure/datasource/FilterImpl";
import FilterModel from "@/infrastructure/models/FilterModel";

jest.mock('node-fetch');
  describe('Schedule Tests', () => {
      
      let generator: ScheduleGenerator;
      //let courseImporter: CoursesCsvDatasource;
      let courses:  Course[];
      let schedules: Course[][];
      let filter: FilterImpl;
      const modalities = ["Jorge Ricardo Gómez Montalvo"];
      beforeEach( async () =>{
          fetchMock.resetMocks();
          courses = await new CoursesCsvDatasource().getAll();
          filter = new FilterImpl(new FilterModel([""],[],[""],[""]));
          courses = filter.filterByProfessor(courses, modalities[0]);
          generator = new ScheduleGenerator();
          schedules = generator.generateSchedules(courses);
          
      });

  describe('Schedule Generator Tests', () => {
    
      it('Generate schedules based on filters', async () => { 
        expect(schedules).toBeDefined();
        for (const schedule of schedules) {
          console.log(schedule);
          expect(schedule.length).toBeGreaterThan(0);
        }
        
      });
    
      it('Detect scheduling conflicts', async () => {
        for (const schedule of schedules) {
          for (let i = 0; i < schedule.length; i++) {
            for (let j = i + 1; j < schedule.length; j++) {
              expect(generator.courseCompatible(schedule[i], schedule[j])).toBe(true);
            }
          } 
        }
      });

  });
});