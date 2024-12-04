'use client'
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource';
import { FilterImpl } from '@/infrastructure/datasource/FilterImpl';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useEffect, useState } from 'react';

export default function Calendar() {
    const [events, setEvents] = useState<{ color: string; title: string; start: string; end: string; }[]>([]);

    useEffect(() => {
        const data = new CoursesCsvDatasource();

        const days = {
            "Lunes": "02",
            "Martes": "03",
            "Miercoles": "04",
            "Jueves": "05",
            "Viernes": "06",
        }

        data.getCoursesByFilter(new FilterImpl(['IS(2016)'],[5],[],[])).then((courses) => {
            console.log(courses);
            const eventsData = courses.flatMap((course) =>
                course.sessions.map((session) => ({
                    borderColor: 'black',
                    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    title: course.subject.name,
                    start: '2024-12-' + days[session.day as keyof typeof days] + 'T' + session.startHour.format('HH:mm:ss'),
                    end: '2024-12-' + days[session.day as keyof typeof days] + 'T' + session.endHour.format('HH:mm:ss'),
                }))
            );
            setEvents(eventsData);
        });
    }, []);

    return (
        <div className="w-full h-full">
            <FullCalendar
                dayHeaderFormat={{ weekday: 'long'  }}
                locale={"es-MX"}
                slotLabelContent={(args) => args.date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false })}
                // headerToolbar= {false}
                allDaySlot={false}
                slotMinTime="07:00:00"
                slotMaxTime={"22:00:00"}
                // height="100%"
                hiddenDays={[0, 6]}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={
                    events
                }
            />
        </div>
    );
}