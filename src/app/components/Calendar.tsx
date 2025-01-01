'use client'

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import './calendar.css';

interface CalendarProps {
    events: { color: string; title: string; start: string; end: string; }[]
    dayFormat: 'long' | 'short';
}

const Calendar: React.FC<CalendarProps> = ({ events, dayFormat }) => {

    return (
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
                dayHeaderContent={(args) => args.date.toLocaleDateString('es-MX', { weekday: dayFormat }).charAt(0).toUpperCase() + args.date.toLocaleDateString('es-MX', { weekday: dayFormat }).slice(1)}
            />
        </div>
    );
}

export default Calendar