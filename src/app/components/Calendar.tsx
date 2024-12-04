'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';

interface CalendarProps {
    events: { color: string; title: string; start: string; end: string; }[]
    totalPages: number
    onChangePage: (page: number) => void
}


const Calendar: React.FC<CalendarProps> = ({ events, totalPages, onChangePage }) => {
    const [page, setPage] = useState(0);

    const onChange = (page: number) => {
        setPage(page)
        onChangePage(page)
    }
    return (
        <div >
            <Pagination onNext={() => {onChange(page + 1)}} onPrevious={() => {onChange(page - 1)}} isNextDisabled={page == totalPages} isPreviousDisabled={page == 0} />
            <FullCalendar
            headerToolbar={false}
            dayHeaderFormat={{ weekday: 'long' }}
            locale={"es-MX"}
            slotLabelContent={(args) => args.date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false })}
            // headerToolbar= {false}
            allDaySlot={false}
            slotMinTime="07:00:00"
            slotMaxTime={"22:00:00"}
            // height="100%"
            height={500}
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

export default Calendar