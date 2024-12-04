'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======

import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
>>>>>>> dev

/**
 * Componente calendario del horario, sus componentes y metodo principal
 */

/**
 * Propiedades que tendra la vista principal del componente horario
 */
interface CalendarProps {
    events: { color: string; title: string; start: string; end: string; }[]
    totalPages: number
    onChangePage: (page: number) => void
}

<<<<<<< HEAD
/**
 * Define los componentes y el comportamiento del horario
 * @param events sesiones de clases del horario
 * @returns Estructura del calendario
 */
const Calendar: React.FC<CalendarProps> = ({ events }) => {
=======

const Calendar: React.FC<CalendarProps> = ({ events, totalPages, onChangePage }) => {
    const [page, setPage] = useState(0);

    const onChange = (page: number) => {
        setPage(page)
        onChangePage(page)
    }
>>>>>>> dev
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