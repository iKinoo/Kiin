"use client";

import React from 'react'
import { useSearchParams } from 'next/navigation';
import Calendar from '@/app/components/Calendar';
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource'
import { Course } from '@/domain/entities/Course';



function HorarioPage() {

  const searchParams = useSearchParams();
  const idsParam = searchParams?.get('ids'); // "1,23,64,98"
  const ids = React.useMemo(() => idsParam ? idsParam.split(',').map(Number) : [], [idsParam]);

  type EventType = {
    color: string;
    title: string;
    start: string;
    end: string;
    borderColor: string;
    extendedProps: {
      room: string;
      professor: string;
    };
  };

  const [events, setEvents] = React.useState<EventType[]>([]);
  const [courses, setCourses] = React.useState<Course[]>([]);


  React.useEffect(() => {
    (new CoursesCsvDatasource()).getAll().then(courses => {
      const filteredCourses = courses.filter(course => ids.includes(course.id));
      setCourses(filteredCourses);
      console.log("Cursos filtrados:");


      setEvents(
        filteredCourses.flatMap(course => mapEvents(course))
      );
      // Aquí podrías hacer algo con los cursos filtrados, como pasarlos a un estado o contexto
    }
    ).catch(error => {
      console.error("Error al obtener los cursos:", error);
    });
  }, [ids]);

  console.log(courses)

  return (<div className="flex flex-row justify-center p-4">
    <div className='w-[80%] px-10'>
      <Calendar events={events} dayFormat={'long'} />
    </div>

    <div className='w-[20%]'>

      <h2 className="text-center text-xl font-bold my-4">Horario</h2>
      {courses.map((course, index) => (
        <div key={index} >
          <div className="mb-4 border-2 p-4 rounded-lg border-gray-300 text-small">
            <h3 className=" font-semibold">{course.subject.name}</h3>
            <p>Grupo: {course.group}</p>
            <p>Profesor: {course.professor.fullName}</p>
            <p>Carrera: {course.subject.degreeResume}</p>
            <p>Semestre: {course.subject.semestre.join(', ')}</p>
            <p>Modalidad: {course.modality}</p>
          </div>
        </div>
      ))}</div>

  </div>

  )
}

export default HorarioPage


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