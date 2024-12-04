'use client'
import React from "react";
import FilterSelector from "../components/FilterSelector";
import SideBar from '../components/SideBar'
import Calendar from "../components/Calendar";
import TemporaryForm from "../components/TemporaryForm";
import { ScheduleGenerator } from '@/domain/entities/ScheduleGenerator';
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource';
import { FilterImpl } from '@/infrastructure/datasource/FilterImpl';
import { useEffect, useState } from "react";
import FilterModel from "@/infrastructure/models/FilterModel";


const CalendarPage = () => {
    const [events, setEvents] = useState<{ color: string; title: string; start: string; end: string; }[]>([]);
    const [currentFilters, setCurrentFilters] = useState<FilterModel>(new FilterModel(['IS(2016)'], [5], [], []));
    const defaultFilters = new FilterModel(['IS(2016)'], [5], [], [])

    const filterCourses = (filters: FilterModel) => {
        const data = new CoursesCsvDatasource();
        
        const days = {
            "Lunes": "02",
            "Martes": "03",
            "Miercoles": "04",
            "Jueves": "05",
            "Viernes": "06",
        }
        const filter = new FilterImpl(filters);

        data.getCoursesByFilter(filter).then((courses) => {
            
            const generator = new ScheduleGenerator();
            const schedule = generator.generateSchedules(courses);
            const eventsData = schedule[54].flatMap((course) => {

                const color = '#' + Math.floor(Math.random() * 16777215).toString(16)

                return course.sessions.map((session) => ({
                    borderColor: 'black',
                    color: color,
                    title: course.subject.name,
                    start: '2024-12-' + days[session.day as keyof typeof days] + 'T' + session.startHour.format('HH:mm:ss'),
                    end: '2024-12-' + days[session.day as keyof typeof days] + 'T' + session.endHour.format('HH:mm:ss'),
                }))
            }
            );
            setEvents(eventsData);

        });
    }

    useEffect(() => {
        filterCourses(defaultFilters);
    }, []);

    return (
        <div
            className="bg-white text-black h-full flex flex-row"
        >
            <SideBar>
                <FilterSelector />
            </SideBar>
            <div className="w-5/6 p-5 h-full">
                <TemporaryForm />
                <Calendar events={events}/>

            </div>
        </div>
    );
};

export default CalendarPage;
