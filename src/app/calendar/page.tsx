'use client'
import React from "react";
import FilterSelector from "../components/FilterSelector";
import SideBar from '../components/SideBar'
import Calendar from "../components/Calendar";
import { ScheduleGenerator } from '@/domain/entities/ScheduleGenerator';
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource';
import { FilterImpl } from '@/infrastructure/datasource/FilterImpl';
import { useEffect, useState } from "react";
import FilterModel from "@/infrastructure/models/FilterModel";
import Category from "@/domain/entities/Category";
import { Course } from "@/domain/entities/Course";
import Pagination from "../components/Pagination";


const CalendarPage = () => {
    const [events, setEvents] = useState<{ color: string; title: string; start: string; end: string; }[]>([]);
    const [currentFilters, setCurrentFilters] = useState<FilterModel>(new FilterModel([], [], [], []));
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [schedule, setSchedule] = React.useState<Course[][]>([]);
    const [page, setPage] = useState(0);

    const mapCategories = async () => {
        const data = new CoursesCsvDatasource();
        const courses = await data.getAll();
        const professorsFullName: string[] = []
        const degress: string[] = []
        const subjects: string[] = []
        const semesters: number[] = []
        courses.forEach(course => {
            if (!professorsFullName.includes(course.professor.fullName())) {
                professorsFullName.push(course.professor.fullName())
            }            
            if (!degress.includes(course.subject.degree)) {
                degress.push(course.subject.degree)
            }

            if (!subjects.includes(course.subject.name)) {
                subjects.push(course.subject.name)
            }

            if (!semesters.includes(course.subject.semestre) && course.subject.semestre > 0) {
                semesters.push(course.subject.semestre)
            }

        })
        setCategories([
            new Category('Carrera', degress),
            new Category('Semestre', semesters.sort((a, b) => a - b).map((val) => val.toString())),
            new Category('Profesor', professorsFullName.sort()),
            new Category('Materia', subjects),
        ])

    }

    const filterCourses = async (filters: FilterModel) => {
        const data = new CoursesCsvDatasource();

        const filter = new FilterImpl(filters);
        const courses = await data.getCoursesByFilter(filter)
        if (courses.length === 0) {
            const allCourses = await data.getAll();
            const events = allCourses.flatMap((course) => {
                return mapEvents(course);
            })
            setEvents(events);
            return;
        }
        const generator = new ScheduleGenerator();
        const schedule = generator.generateSchedules(courses);
        setSchedule(schedule);
        const eventsData = getEvents(schedule, 0);
        setEvents(eventsData);
    }

    const getEvents = (schedule: Course[][], index: number) => {
        return schedule[index].flatMap((course) => {
            return mapEvents(course);
        }
        );
    }

    const onChangeSchedulePage = (page: number) => {
        const eventsData = getEvents(schedule, page);
        setEvents(eventsData);
        setPage(page);
    }

    const handleClickFilter = (category: Category, value: string) => {
        const index = categories.findIndex(c => c.title === category.title)

        if (index === -1) { return }

        const newFilter = getNewFilter(category, value);
        setCurrentFilters(newFilter);
        console.log(newFilter)
    }

    const getNewFilter = (category: Category, value: string) => {
        let professors = currentFilters.professors;
        let degress = currentFilters.degrees
        let semesters = currentFilters.semesters;
        let subjects = currentFilters.subjects;

        switch (category.title) {
            case 'Profesor':
                professors = professors.includes(value)
                    ? professors.filter(professor => professor !== value)
                    : [...professors, value]
                break;
            case 'Carrera':
                degress = degress.includes(value)
                    ? degress.filter(degree => degree !== value)
                    : [...degress, value]
                break;
            case 'Semestre':
                semesters = semesters.includes(parseInt(value))
                    ? semesters.filter(semester => semester !== parseInt(value))
                    : [...semesters, parseInt(value)]
                break;
            case 'Materia':
                subjects = subjects.includes(value)
                    ? subjects.filter(subject => subject !== value)
                    : [...subjects, value]
                break;
        }

        return new FilterModel(degress, semesters, professors, subjects)

    }

    useEffect(() => {
        mapCategories();
    }, []);

    return (
        <div
            className="bg-white text-black h-full flex flex-row"
        >
            <SideBar>
                <FilterSelector categories={categories} onClick={handleClickFilter} onSubmit={() => filterCourses(currentFilters)} />
            </SideBar>
            <div className="w-5/6 flex flex-col p-5 h-full">
                <div className="flex justify-between p-2">
                    <p className={`${schedule.length == 0 ? 'opacity-0': ''}`}>Posibles horarios:{schedule.length}</p>
                    <Pagination
                        onNext={() => onChangeSchedulePage(page + 1)}
                        onPrevious={() => onChangeSchedulePage(page - 1)}
                        isNextDisabled={page >= schedule.length - 1}
                        isPreviousDisabled={page == 0}
                    />
                </div>

                <Calendar events={events} />

            </div>
            <div>
            <h2 className="text-xl font-bold mb-4">Horario Actual</h2>
                {schedule.length > 0 ? (
                    schedule[page].map((course, index) => (
                        <div key={index} className="mb-2">
                            <h3 className="text-lg font-semibold">{course.subject.name}</h3>
                            <p>Grupo: {course.group}</p>
                            <p>Profesor: {course.professor.fullName()}</p>
                            <p>Carrera: {course.subject.degree}</p>
                            <p>Semestre: {course.subject.semestre}</p>
                        </div>
                    ))
                ) : (
                    <p>No courses available</p>
                )}
            </div>
        </div>
    );
};
function mapEvents(course: Course) {
    const days = {
        "Lunes": "02",
        "Martes": "03",
        "Miercoles": "04",
        "Jueves": "05",
        "Viernes": "06",
    };
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return course.sessions.map((session) => ({
        borderColor: 'black',
        color: color,
        title: course.subject.name,
        start: '2024-12-' + days[session.day as keyof typeof days] + 'T' + session.startHour.format('HH:mm:ss'),
        end: '2024-12-' + days[session.day as keyof typeof days] + 'T' + session.endHour.format('HH:mm:ss'),
    }));
}


export default CalendarPage;
