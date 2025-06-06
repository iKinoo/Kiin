'use client'

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useMemo, useState } from 'react';
import { EventHoveringArg } from '@fullcalendar/core';
import './calendar.css';
import { Course } from '@/domain/entities/Course';


interface CalendarProps {
    courses: Course[]
    dayFormat: 'long' | 'short';
}

function mapEvents(course: Course) {
    const days = {
        "Lunes": "13",
        "Martes": "14",
        "Miercoles": "15",
        "Jueves": "16",
        "Viernes": "17",
        "Sabado": "18",
    };
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return course.sessions.map((sessionI) => {

        const day = days[sessionI.day as keyof typeof days];
        const dateI = `2025-01-${day}`;

        //Offset de la zona horaria de México (-06:00)
        const startDateTimeString = `${dateI}T${sessionI.startHour.format('HH:mm:ss')}-06:00`;
        const endDateTimeString = `${dateI}T${sessionI.endHour.format('HH:mm:ss')}-06:00`;

        const start = new Date(startDateTimeString);
        const end = new Date(endDateTimeString);

        return {
            color: color,
            title: course.subject.name,
            start: start.toISOString(),
            end: end.toISOString(),
            borderColor: color,
            extendedProps: {
                room: sessionI.room,
                professor: course.professor.fullName
            },
        };
    });
}

const Calendar: React.FC<CalendarProps> = ({ courses, dayFormat }) => {

    interface Tooltip {
        visible: boolean;
        x: number;
        y: number;
        eventArgs?: EventHoveringArg;
    }

    const [tooltip, setTooltip] = useState<Tooltip>({ visible: false, x: 0, y: 0, eventArgs: undefined });

    const events = useMemo(() => {
        return courses?.flatMap((course) => mapEvents(course)) ?? [];
    }, [courses]);


    return (
        <>
            <div className='h-full'>
                <FullCalendar
                    now={'2025-01-13'}
                    dayHeaderClassNames={
                        ['bg-gray-800', 'text-white', '!border-0 rounded']// Usar clases de Tailwind
                    }
                    slotLaneClassNames={
                        ['!border !border-1 dark:!border-gray-500']// Usar clases de Tailwind
                    }
                    viewClassNames={
                        ['!border-0']// Usar clases de Tailwind
                    }
                    slotLabelClassNames={
                        ['!border dark:!border-gray-500']// Usar clases de Tailwind
                    }
                    dayCellClassNames={
                        ['!border-0']// Usar clases de Tailwind
                    }
                    slotLabelFormat={
                        { hour: '2-digit', minute: '2-digit', hour12: false }
                    }
                    height={"auto"}
                    headerToolbar={false}
                    dayHeaderFormat={{ weekday: "long" }}
                    locale={"es-MX"}
                    allDaySlot={false}
                    slotMinTime="07:00:00"
                    hiddenDays={[0, 7]}
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    eventBorderColor='black'
                    dayHeaderContent={(args) => args.date.toLocaleDateString('es-MX', { weekday: dayFormat }).charAt(0).toUpperCase() + args.date.toLocaleDateString('es-MX', { weekday: dayFormat }).slice(1)}
                    eventMouseEnter={(e) => setTooltip({ visible: true, x: e.jsEvent.clientX, y: e.jsEvent.clientY, eventArgs: e })}
                    eventMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, eventArgs: undefined })}
                />
            </div>
            {tooltip.visible && (
                <div
                    className="absolute z-10 bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg"
                    style={{
                        top: tooltip.y + 10,
                        left: tooltip.x + 100,
                        position: "fixed",
                        pointerEvents: "none", // Evita interferencias con otros elementos
                    }}
                >
                    {tooltip.eventArgs?.event.title}
                    <br />
                    Profesor: {tooltip.eventArgs?.event.extendedProps.professor}
                    <br />
                    Salón: {tooltip.eventArgs?.event.extendedProps.room}

                </div>
            )}
        </>
    );
}

export default Calendar;