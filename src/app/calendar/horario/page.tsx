"use client";

import React from 'react'
import { useSearchParams } from 'next/navigation';
import Calendar from '@/app/components/Calendar';
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource'
import { Course } from '@/domain/entities/Course';
import CurrentSchedule from '@/app/components/CurrentSchedule';
import { Schedule } from '@/domain/entities/Schedule';



function HorarioPage() {

  const searchParams = useSearchParams();
  const idsParam = searchParams?.get('ids'); // "1,23,64,98"
  const ids = React.useMemo(() => idsParam ? idsParam.split(',').map(Number) : [], [idsParam]);

  const [courses, setCourses] = React.useState<Course[]>([]);


  React.useEffect(() => {
    (new CoursesCsvDatasource()).getAll().then(courses => {
      const filteredCourses = courses.filter(course => ids.includes(course.id));
      setCourses(filteredCourses);
      console.log("Cursos filtrados:");

    }
    ).catch(error => {
      console.error("Error al obtener los cursos:", error);
    });
  }, [ids]);

  console.log(courses)

  const schedule = new Schedule(99);

  courses?.forEach(course => {
    schedule.addCourse(course);
  });

  return (
    <div className="flex flex-col md:flex-row justify-center p-4 gap-6 min-h-screen">
      
      <div className="w-full md:w-[80%] px-2">
        <Calendar courses={courses} dayFormat={'long'} />
      </div>
      <div className="w-full md:w-[20%] mt-6 md:mt-0">
        <CurrentSchedule schedule={schedule} />
      </div>
    </div>
  );
}

export default HorarioPage


