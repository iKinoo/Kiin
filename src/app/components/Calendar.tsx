'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react';

/**
 * Componente calendario del horario, sus componentes y metodo principal
 */

/**
 * Propiedades que tendra la vista principal del componente horario
 */
interface CalendarProps {
    events: { color: string; title: string; start: string; end: string; }[]
}

/**
 * Define los componentes y el comportamiento del horario
 * @param events sesiones de clases del horario
 * @returns Estructura del calendario
 */
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