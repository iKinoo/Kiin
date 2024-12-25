"use client";
import React from "react";
import FilterSelector from "../components/FilterSelector";
import SideBar from "../components/SideBar";
import Calendar from "../components/Calendar";
import { ScheduleGenerator } from "@/domain/entities/ScheduleGenerator";
import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import { FilterImpl } from "@/infrastructure/datasource/FilterImpl";
import { useEffect, useState } from "react";
import Category from "@/domain/entities/Category";
import { Course } from "@/domain/entities/Course";
import Pagination from "../components/Pagination";
import { DegreesCsvDataSource } from "@/infrastructure/datasource/DegreesCsvDataSource";
import { SubjectsCsvDataSource } from "@/infrastructure/datasource/SubjectsCSvDataSource";
import { ProfessorsCsvDataSource } from "@/infrastructure/datasource/ProfessorsCsvDataSource";
import { Degree } from "@/domain/entities/Degree";
import { Subject } from "@/domain/entities/Subject";
import { Professor } from "@/domain/entities/Professor";
import DegreeCategory from "@/domain/entities/DegreeCategory";
import ProfessorCategory from "@/domain/entities/ProfessorCategory";
import SubjectCategory from "@/domain/entities/SubjectCategory";
import SemesterCategory from "@/domain/entities/SemesterCategory";
import LiveIndicator from "../components/UpdateIndicator";
import { Modalities } from "@/domain/entities/Modalities";
import { getEnumValues } from "@/utils/EnumArray";
import { ModalityCategory } from "@/domain/entities/ModalityCategory";
import { Group } from "@/domain/entities/Group";
import GroupCategory from "@/domain/entities/GroupCategory";

const CalendarPage = () => {
  const [events, setEvents] = useState<
    { color: string; title: string; start: string; end: string }[]
  >([]);
  const [currentCategories, setCurrentCategories] = React.useState<Category[]>([]);
  const [schedule, setSchedule] = React.useState<Course[][]>([]);
  const [page, setPage] = useState(0);
  const [isFilterCoursesEmpty, setIsFilterCoursesEmpty] = useState(false);

  const [selectedSubjectsCount, setSelectedSubjectsCount] = useState<number | number[]>(0);
  const [maxSubjectsCount, setMaxSubjectsCount] = useState<number>(0);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedSubjectsCount(value);
  };

  const mapCategories = async () => {

    const professors: Professor[] = await (new ProfessorsCsvDataSource()).getAll();
    const professorsCategory: Category = new ProfessorCategory("Profesor", professors);
    const degrees: Degree[] = await (new DegreesCsvDataSource()).getAll();
    const degreesCategory: Category = new DegreeCategory("Carrera", degrees);
    const subjects: Subject[] = await (new SubjectsCsvDataSource()).getAll();
    const subjectsCategory: Category = new SubjectCategory("Materia", subjects);
    const semesters: number[] = new Array(9).fill(0).map((_, index) => index + 1);
    const semestersCategory: Category = new SemesterCategory("Semestre", semesters);
    const modalities: Modalities[] = getEnumValues(Modalities);
    const modalitiesCategory: Category = new ModalityCategory("Modalidad", modalities);
    const groups: Group[] = getEnumValues(Group);
    const groupsCategory: Category = new GroupCategory("Grupo", groups);
    setCurrentCategories([degreesCategory, semestersCategory, subjectsCategory, professorsCategory, modalitiesCategory, groupsCategory]);
  };

  const filterCourses = async (categories: Category[]) => {
    setPage(0)
    const data = new CoursesCsvDatasource();
    const filter = new FilterImpl(categories.map((category) => category.toCourseFilter()));
    const courses = await data.getCoursesByFilter(filter)

    if (courses.length === 0) {
      setSchedule([]);
      setEvents([]);
      setIsFilterCoursesEmpty(true);
      return;
    }

    const generator = new ScheduleGenerator();
    const numberOfSubjects = Array.isArray(selectedSubjectsCount) ? selectedSubjectsCount[0] : selectedSubjectsCount;
    const schedules = generator.generateSchedules(courses).filter((schedule) => numberOfSubjects > 0 ? schedule.length === numberOfSubjects : true);
    setSchedule(schedules);
    const eventsData = getEvents(schedules, 0);
    setEvents(eventsData);
  }

  const getEvents = (schedule: Course[][], index: number) => {
    if (schedule.length === 0) {
      return [];
    }
    return schedule[index].flatMap((course) => {
      return mapEvents(course);
    });
  };

  const onChangeSchedulePage = (page: number) => {
    const eventsData = getEvents(schedule, page);
    setEvents(eventsData);
    setPage(page);
  };

  const handleClickFilter = (category: Category[]) => {
    setCurrentCategories(category);
    const testL = category.find(c => c.title === 'Materia')?.selectedValues.length ?? 0;
    setMaxSubjectsCount(testL);
  }

  useEffect(() => {
    if (isFilterCoursesEmpty) {
      alert('No hay cursos disponibles con los filtros seleccionados')
      setIsFilterCoursesEmpty(false)
    }
  }, [isFilterCoursesEmpty])

  // const handleShare = () => {
  //   const shareText =
  //     "Mira la carga academica que me encontré: " + window.location.href;
  //   const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  //   window.open(url, "_blank");
  // };

  useEffect(() => {
    mapCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SideBar>
        <FilterSelector
          categories={currentCategories}
          onClick={handleClickFilter}
          onSubmit={() => filterCourses(currentCategories)}
          onChanceSliderValue={handleSliderChange}
          maxSliderValue={maxSubjectsCount}
        />
      </SideBar>
      <div className="p-5 pl-2 sm:w-4/6 sm:p-5 h-full">
              <div className="grid grid-cols-6 grid-rows-2 justify-center items-center mb-2 p-2 sm:grid-rows-1">
                <div className="col-span-6 row-span-1 flex mx-4 sm:col-start-3 sm:col-end-4 sm:row-span-2">
                  <LiveIndicator isLive={true} />
                  <div className="ml-3 sm:mx-1"/>
                  Última actualización: 19 de diciembre de 2024
                </div>
                <div className={`${schedule.length == 0 ? "opacity-0" : ""} col-start-1 col-end-2 row-span-2 sm:col-end-2 sm:row-span-1 border-2 rounded-lg border-gray-300 flex items-center p-2 justify-between`}>
                  <p>
                    Posibles horarios: {schedule.length}
                  </p>
                </div>
                <div className="col-start-3 col-end-6  row-span-2 flex justify-center items-center sm:col-start-5 sm:row-span-1">
                <Pagination
                  onNext={() => onChangeSchedulePage(page + 1)}
                  onPrevious={() => onChangeSchedulePage(page - 1)}
                  isNextDisabled={page >= schedule.length - 1}
                  isPreviousDisabled={page == 0}
                />
                </div>
        </div>

        <Calendar events={events} />
       
      </div>
      <div className="sm:w-1/5 sm:m-5 sm:ml-0 px-4">
        <h2 className="text-center text-xl font-bold my-4">Horario Actual</h2>
        {schedule.length > 0 ? (
          schedule[page].map((course, index) => (
            <div key={index} className="mb-4 border-2 p-4 rounded-lg border-gray-300 text-small">
              <h3 className=" font-semibold">{course.subject.name}</h3>
              <p>Grupo: {course.group}</p>
              <p>Profesor: {course.professor.fullName}</p>
              <p>Carrera: {course.subject.degreeResume}</p>
              <p>Semestre: {course.subject.semestre.join(', ')}</p>
              <p>Modalidad: {course.modality}</p>
            </div>
          ))
        ) : (
          <p className="text-center">Sin cursos disponibles</p>
        )}
      </div>
    </div>
  );
};
function mapEvents(course: Course) {
  const days = {
    "Lunes": "23",
    "Martes": "24",
    "Miercoles": "25",
    "Jueves": "26",
    "Viernes": "27",
    "Sabado": "28",
  };
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

  return course.sessions.map((sessionI) => {

    const day = days[sessionI.day as keyof typeof days];
    const dateI = `2024-12-${day}`;

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
    };
  });
}
export default CalendarPage;
