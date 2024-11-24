
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";

export function initializeCalendar() {
    document.addEventListener("DOMContentLoaded", function () {
        let calendarEl: HTMLElement = document.getElementById("calendar")!;

        let calendar = new Calendar(calendarEl, {
            
            plugins: [timeGridPlugin],
            initialView: "timeGridWeek",

            events: [
                {
                    color: "red",
                    title: "Probabilidad",
                    start: "2024-11-18T07:30:00",
                    end: "2024-11-18T09:30:00",
                },
                {
                    color: "blue",
                    title: "Estructuras de Datos",
                    start: "2024-11-18T10:30:00",
                    end: "2024-11-18T12:00:00",
                },
                {
                    color: "green",
                    title: "Sistemas Operativos",
                    start: "2024-11-18T12:00:00",
                    end: "2024-11-18T13:30:00",
                },
                {
                    color: "purple",
                    title: "Probabilidad",
                    start: "2024-11-19T07:30:00",
                    end: "2024-11-19T09:30:00",
                },
                {
                    color: "orange",
                    title: "Teoría de Lenguajes de Programación",
                    start: "2024-11-19T09:30:00",
                    end: "2024-11-19T11:30:00",
                },
                {
                    color: "#B08D00",
                    title: "Diseño de Software",
                    start: "2024-11-19T12:00:00",
                    end: "2024-11-19T13:30:00",
                },
                {
                    color: "purple",
                    title: "Teoría de Lenguajes de Programación",
                    start: "2024-11-20T11:00:00",
                    end: "2024-11-20T13:00:00",
                },
                {
                    color: "blue",
                    title: "Estructuras de Datos",
                    start: "2024-11-21T09:00:00",
                    end: "2024-11-21T10:30:00",
                },
                {
                    color: "magenta",
                    title: "Sistemas Operativos",
                    start: "2024-11-21T10:30:00",
                    end: "2024-11-21T12:00:00",
                },
                {
                    color: "brown",
                    title: "Diseño de Software",
                    start: "2024-11-21T12:00:00",
                    end: "2024-11-21T13:30:00",
                },
                {
                    color: "brown",
                    title: "Diseño de Software",
                    start: "2024-11-22T07:30:00",
                    end: "2024-11-22T09:00:00",
                },
                {
                    color: "gray",
                    title: "Sistemas Operativos",
                    start: "2024-11-22T10:30:00",
                    end: "2024-11-22T12:00:00",
                },
                {
                    color: "black",
                    title: "Estructuras de Datos",
                    start: "2024-11-22T12:00:00",
                    end: "2024-11-22T13:30:00",
                },
            ],
            eventTimeFormat: { // like '14:30:00'
                hour: '2-digit',
                minute: '2-digit',
                
                meridiem: false
              },

            // options here
        });

        calendar.render();
    });
}