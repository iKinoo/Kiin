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
import Category from "@/app/Category";
import { Course } from "@/domain/entities/Course";
import Pagination from "../components/Pagination";
import NavBar from "../components/NavBar";
import { ScheduleItem } from "../components/Schedule";



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
            if (!professorsFullName.includes(course.professor.fullName)) {
                professorsFullName.push(course.professor.fullName)
            }

            if (!degress.includes(course.subject.degreeResume)) {
                degress.push(course.subject.degreeResume)
            }


            if (!subjects.includes(course.subject.name)) {
                subjects.push(course.subject.name)
            }

            course.subject.semestre.forEach(semester => {
                if (!semesters.includes(semester)) {
                    semesters.push(semester)
                }
            })



        })
        setCategories([
            new Category('Carrera', degress),
            new Category('Semestre', semesters.sort((a, b) => a - b).map((val) => val?.toString())),
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
    

    const links = [
        { label: 'Inicio', route: '' },
        { label: 'Contacto', route: '' },
        { label: 'Motivacion', route: '' }
      ]


    const schedules = [
        {title: 'Horario A'},
        {title: 'Horario B'},
        {title: 'Horario C'},
        {title: 'Horario D'},
        {title: 'Horario E'},
        {title: 'Horario F'}

    ]  
    return (
        <div
            className="bg-white text-black h-full"
        >
            <NavBar links={links} />
            <div className="flex flex-row">
                <SideBar>
                    <FilterSelector categories={categories} onClick={handleClickFilter} onSubmit={() => filterCourses(currentFilters)} />
                </SideBar>
                <div className="w-4/6 flex flex-col p-5 h-full">
                    <div className="flex justify-between p-2">
                        <p className={`${schedule.length == 0 ? 'opacity-0' : ''}`}>Posibles horarios:{schedule.length}</p>
                        <Pagination
                            onNext={() => onChangeSchedulePage(page + 1)}
                            onPrevious={() => onChangeSchedulePage(page - 1)}
                            isNextDisabled={page >= schedule.length - 1}
                            isPreviousDisabled={page == 0}
                        />
                    </div>

                    <Calendar events={events} />

                </div>
                <div className="shadow-2xl rounded-xl border-gray-700 border-2 w-1/6 my-6 mr-4 flex flex-col justify-start items-center py-4">
                    <h2 className="text-xl font-bold">Horario Actual</h2>
                    
                    <ul className="mt-10 w-full flex flex-col justify-between items-center flex-wrap gap-3 px-4">
                        {schedules.map((schedule, index) => (
                            <ScheduleItem key={index} title={schedule.title} />
                        ))}
                    </ul>
                    
                    {schedule.length > 0 ? (
                        schedule[page].map((course, index) => (
                            <div key={index} className="mb-2">
                                <h3 className="text-lg font-semibold">{course.subject.name}</h3>
                                <p>Grupo: {course.group}</p>
                                <p>Profesor: {course.professor.fullName}</p>
                                <p>Carrera: {course.subject.degrees}</p>
                                <p>Semestre: {course.subject.semestre}</p>
                            </div>
                        ))
                    ) : (
                        <p className="my-6">Sin cursos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};
function mapEvents(course: Course) {
    const days = {
        "Lunes": "09",
        "Martes": "10",
        "Miercoles": "11",
        "Jueves": "12",
        "Viernes": "13",
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
