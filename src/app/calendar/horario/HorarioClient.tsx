// app/calendar/horario/HorarioClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Calendar from '@/app/components/Calendar';
import CurrentSchedule from '@/app/components/CurrentSchedule';
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource';
import { Course } from '@/domain/entities/Course';
import { Schedule } from '@/domain/entities/Schedule';

export default function HorarioClient() {
  const searchParams = useSearchParams();
  const idsParam = searchParams?.get('ids'); // "1,23,64,98"
  const ids = React.useMemo(() => idsParam ? idsParam.split(',').map(Number) : [], [idsParam]);

  const [courses, setCourses] = React.useState<Course[]>([]);

  const [dayFormat, setDayFormat] = useState<"short" | "long">("long");
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 640) {
          setDayFormat("long")
        } else {
          setDayFormat("short")
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  
    }, []);

  React.useEffect(() => {
    (new CoursesCsvDatasource()).getAll().then(courses => {
      const filteredCourses = courses.filter(course => ids.includes(course.id));
      setCourses(filteredCourses);
    }).catch(error => {
      console.error("Error al obtener los cursos:", error);
    });
  }, [ids]);

  const schedule = new Schedule(99);
  courses?.forEach(course => schedule.addCourse(course));

  return (
    <div className="flex flex-col md:flex-row justify-center p-4 gap-6 min-h-screen">
      <div className="w-full md:w-[80%] px-2">
        <Calendar courses={courses} dayFormat={dayFormat} />
      </div>
      <div className="w-full md:w-[20%] mt-6 md:mt-0">
        <CurrentSchedule schedule={schedule} />
      </div>
    </div>
  );
}
