'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useEffect, useState } from 'react';

interface CalendarProps {
    events: { color: string; title: string; start: string; end: string; }[]
}
const Calendar: React.FC<CalendarProps> = ({ events }) => {
    

    return (
        <FullCalendar
            dayHeaderFormat={{ weekday: 'long' }}
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
    );
}

export default Calendar