'use client'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function Calendar() {
    return (
        <div style={{width:'100%'}} className="">
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                
                events={
                    [
                        {
                            color: "red",
                            title: "Probabilidad",
                            start: "2024-11-25T07:30:00",
                            end: "2024-11-25T09:30:00",
                        },
                        {
                            color: "blue",
                            title: "Estructuras de Datos",
                            start: "2024-11-25T10:30:00",
                            end: "2024-11-25T12:00:00",
                        },
                        {
                            color: "green",
                            title: "Sistemas Operativos",
                            start: "2024-11-25T12:00:00",
                            end: "2024-11-25T13:30:00",
                        },
                        {
                            color: "purple",
                            title: "Probabilidad",
                            start: "2024-11-26T07:30:00",
                            end: "2024-11-26T09:30:00",
                        },
                        {
                            color: "orange",
                            title: "Teoría de Lenguajes de Programación",
                            start: "2024-11-26T09:30:00",
                            end: "2024-11-26T11:30:00",
                        },
                        {
                            color: "#B08D00",
                            title: "Diseño de Software",
                            start: "2024-11-26T12:00:00",
                            end: "2024-11-26T13:30:00",
                        },
                        {
                            color: "purple",
                            title: "Teoría de Lenguajes de Programación",
                            start: "2024-11-27T11:00:00",
                            end: "2024-11-27T13:00:00",
                        },
                        {
                            color: "blue",
                            title: "Estructuras de Datos",
                            start: "2024-11-28T09:00:00",
                            end: "2024-11-28T10:30:00",
                        },
                        {
                            color: "magenta",
                            title: "Sistemas Operativos",
                            start: "2024-11-28T10:30:00",
                            end: "2024-11-28T12:00:00",
                        },
                        {
                            color: "brown",
                            title: "Diseño de Software",
                            start: "2024-11-28T12:00:00",
                            end: "2024-11-28T13:30:00",
                        },
                        {
                            color: "brown",
                            title: "Diseño de Software",
                            start: "2024-11-29T07:30:00",
                            end: "2024-11-29T09:00:00",
                        },
                        {
                            color: "gray",
                            title: "Sistemas Operativos",
                            start: "2024-11-29T10:30:00",
                            end: "2024-11-29T12:00:00",
                        },
                        {
                            color: "black",
                            title: "Estructuras de Datos",
                            start: "2024-11-29T12:00:00",
                            end: "2024-11-29T13:30:00",
                        },
                    ]
                }
            />
        </div>
    )
}