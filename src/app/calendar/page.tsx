"use client";
import Category from "@/domain/entities/Category";
import { Course } from "@/domain/entities/Course";
import { Degree } from "@/domain/entities/Degree";
import DegreeCategory from "@/domain/entities/DegreeCategory";
import { Group } from "@/domain/entities/Group";
import GroupCategory from "@/domain/entities/GroupCategory";
import { Modalities } from "@/domain/entities/Modalities";
import { ModalityCategory } from "@/domain/entities/ModalityCategory";
import { Professor } from "@/domain/entities/Professor";
import ProfessorCategory from "@/domain/entities/ProfessorCategory";
import { ScheduleGenerator } from "@/domain/entities/ScheduleGenerator";
import SemesterCategory from "@/domain/entities/SemesterCategory";
import { Subject } from "@/domain/entities/Subject";
import SubjectCategory from "@/domain/entities/SubjectCategory";
import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import { DegreesCsvDataSource } from "@/infrastructure/datasource/DegreesCsvDataSource";
import { FilterImpl } from "@/infrastructure/datasource/FilterImpl";
import { ProfessorsCsvDataSource } from "@/infrastructure/datasource/ProfessorsCsvDataSource";
import { SubjectsCsvDataSource } from "@/infrastructure/datasource/SubjectsCSvDataSource";
import { getEnumValues } from "@/utils/EnumArray";
import React, { useEffect, useState } from "react";
import AdBanner from "../components/AdBanner";
import Calendar from "../components/Calendar";
import FilterSelector from "../components/FilterSelector";
import Pagination from "../components/Pagination";
import SideBar from "../components/SideBar";
import LiveIndicator from "../components/UpdateIndicator";

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

  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

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

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <SideBar toggleSideBar={toggleSideBar} isOpen={isSideBarOpen}>
        <FilterSelector
          categories={currentCategories}
          onClick={handleClickFilter}
          onSubmit={() => filterCourses(currentCategories)}
          onChanceSliderValue={handleSliderChange}
          maxSliderValue={maxSubjectsCount}
          toggleSideBar={toggleSideBar}
        />
      </SideBar>
      <div className="p-5 pl-2 h-full sm:w-4/6 sm:p-5">
        <button
          onClick={toggleSideBar}
          className="sticky font-medium mt-2 px-3 py-3 top-20 z-30 rounded-lg border-2 border-gray-500 bg-white text-black dark:bg-gray-800 dark:text-gray-100 flex flex-row justify-center gap-2 transition-colors duration-300 hover:bg-gray-700 dark:hover:bg-gray-900 active:bg-gray-600 dark:active:bg-gray-800 sm:hidden"
          type="button"
        >
          Filtros
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="size-6 stroke-black dark:stroke-white transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>

        <div className="grid grid-cols-6 grid-rows-2 ml-10 justify-center items-end mb-2 p-2 sm:grid-rows-1">
          <div className="col-start-1 col-end-7 row-start-2 flex sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:mt-0">
            <LiveIndicator isLive={true} />
            <div className="ml-3 sm:mx-1" />
            Última actualización: 19 de diciembre de 2024
          </div>
          <div className={`${schedule.length == 0 ? "opacity-0" : ""} col-start-1 col-span-6 row-start-1 mt-14 sm:col-end-2 sm:row-start-1 border-2 rounded-lg border-gray-300 flex items-center p-2 justify-between`}>
            <p>
              Posibles horarios: {schedule.length}
            </p>
          </div>
          <div className={`transition-all duration-500 ${isSideBarOpen && dayFormat === "short" ? "opacity-0" : "flex justify-center items-center sm:col-start-5 sm:col-span-2 sm:justify-self-end sm:row-span-1"}`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedule.length - 1}
              isPreviousDisabled={page == 0}
            />
          </div>
        </div>

        <Calendar events={events} dayFormat={dayFormat} />

      </div>
      <div className="sm:w-1/5 sm:m-5 sm:ml-0 px-4 pb-4 mb-20 mt-10">
        <h2 className="text-center text-xl font-bold my-4">Horario Actual</h2>
        {schedule.length > 0 ? (
          schedule[page].map((course, index) => (
            <div key={index} >
              <div className="mb-4 border-2 p-4 rounded-lg border-gray-300 text-small">
                <h3 className=" font-semibold">{course.subject.name}</h3>
                <p>Grupo: {course.group}</p>
                <p>Profesor: {course.professor.fullName}</p>
                <p>Carrera: {course.subject.degreeResume}</p>
                <p>Semestre: {course.subject.semestre.join(', ')}</p>
                <p>Modalidad: {course.modality}</p>
              </div>

              {(index + 1) % 2 === 0 &&
                <div style={{ height: '200px' }} className="bg-transparent mb-4 p-4">
                  <AdBanner
                    dataAdSlot="4900058210"
                    dataAdLayoutKey="-gw-3+1f-3d+2z"
                    dataAdFormat="fluid"
                    dataFullWidthResponsive={true}
                  />
                </div>
              }
            </div>

          ))
        ) : (
          <div className="gap-5">
            <p className="text-center">Sin cursos disponibles</p>
            <div className="bg-white">
              <AdBanner
                dataAdSlot="7039104578"
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
              />
            </div>
          </div>
        )}
      </div>
    </div >
  );
};
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
    };
  });
}
export default CalendarPage;
