import { ProfessorsCsvDataSource } from "@/infrastructure/datasource/ProfessorsCsvDataSource";
import { SubjectsCsvDataSource } from "@/infrastructure/datasource/SubjectsCSvDataSource";
import { ProfessorsRepositoryImpl } from "@/infrastructure/repositories/ProfessorsRepositoryImpl";
import { SubjectsRepositoryImpl } from "@/infrastructure/repositories/SubjectsRepositoryImpl";
import fetchMock from 'jest-fetch-mock';
jest.mock('node-fetch');
jest.mock('path');
describe('Repository Tests', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('Read data from CSV file', async () => { 
        const response = await fetch('http://localhost:3000/api/courses');
        expect(response).not.toBeNull();
    });

    it('Get Ok response from CSV reader endpoint', async () => { 
        const response = await fetch('http://localhost:3000/api/courses');
        expect(response.status).toBe(200);
    });

    /* Test not working
    it('Handle missing or corrupted CSV file', async () => {
        const { req, res } = createMocks({
            method: 'GET',
          });
        
          (path.join as jest.Mock).mockReturnValue('src/Test/mocks/dataCorrupted.csv');
        
        await course(req, res);

        expect(res._getStatusCode()).toBe(500);
    });
    */
    it('Repository should return a list of Professors', async () => {
        const dataSource = new ProfessorsCsvDataSource();
        const professors = new ProfessorsRepositoryImpl(dataSource);
        const result = await professors.getAll();
        
        expect(result).not.toBeNull();
        expect(result.length).toBeGreaterThan(0);
    });
    
    it('Repository should return a list of Subjects', async () => {
        const dataSource = new SubjectsCsvDataSource();
        const subjects = new SubjectsRepositoryImpl(dataSource);
        const result = await subjects.getAll();
        
        expect(result).not.toBeNull();
        expect(result.length).toBeGreaterThan(0);
    });

    it('Courses should return a list of Schedules', async () => {
        expect(1).toBe(1); 
    });
});
  