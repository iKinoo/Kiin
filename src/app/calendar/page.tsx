"use client";
import Category from "@/domain/entities/Category";
import { Degree } from "@/domain/entities/Degree";
import DegreeCategory from "@/domain/entities/DegreeCategory";
import { ScheduleGenerator } from "@/domain/entities/ScheduleGenerator";
import SemesterCategory from "@/domain/entities/SemesterCategory";
import { Subject } from "@/domain/entities/Subject";
import SubjectCategory from "@/domain/entities/SubjectCategory";
import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import { DegreesCsvDataSource } from "@/infrastructure/datasource/DegreesCsvDataSource";
import { FilterImpl } from "@/infrastructure/datasource/FilterImpl";
import { SubjectsCsvDataSource } from "@/infrastructure/datasource/SubjectsCSvDataSource";
import React, { useEffect, useState } from "react";
// import AdBanner from "../components/AdBanner";
import { Schedule } from "@/domain/entities/Schedule";
import Calendar from "../components/Calendar";
import FilterSelector from "../components/FilterSelector";
import Pagination from "../components/Pagination";
import SideBar from "../components/SideBar";
import LiveIndicator from "../components/UpdateIndicator";
import CurrentSchedule from "../components/CurrentSchedule";
const CalendarPage = () => {
  const [currentCategories, setCurrentCategories] = React.useState<Category[]>([]);
  const [schedule, setSchedule] = React.useState<Schedule[]>([]);
  const [page, setPage] = useState(0);
  const [isFilterCoursesEmpty, setIsFilterCoursesEmpty] = useState(false);

  const [selectedSubjectsCount, setSelectedSubjectsCount] = useState<number | number[]>(0);
  const [maxSubjectsCount, setMaxSubjectsCount] = useState<number>(0);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedSubjectsCount(value);
  };

  const mapCategories = async () => {

    const degrees: Degree[] = await (new DegreesCsvDataSource()).getAll();
    const degreesCategory: Category = new DegreeCategory("Carrera", degrees);
    const subjects: Subject[] = await (new SubjectsCsvDataSource()).getAll();
    const subjectsCategory: Category = new SubjectCategory("Materia", subjects);
    const semesters: number[] = new Array(9).fill(0).map((_, index) => index + 1);
    const semestersCategory: Category = new SemesterCategory("Semestre", semesters);
    setCurrentCategories([degreesCategory, semestersCategory, subjectsCategory]);
  };

  const filterCourses = async (categories: Category[]) => {
    setPage(0)
    const data = new CoursesCsvDatasource();
    const filter = new FilterImpl(categories.map((category) => category.toCourseFilter()));
    const courses = await data.getCoursesByFilter(filter)

    if (courses.length === 0) {
      setSchedule([]);
      setIsFilterCoursesEmpty(true);
      return;
    }

    const generator = new ScheduleGenerator();
    const numberOfSubjects = Array.isArray(selectedSubjectsCount) ? selectedSubjectsCount[0] : selectedSubjectsCount;
    const schedules = generator.generateSchedules(courses).filter((schedule) => numberOfSubjects > 0 ? schedule.courses.length === numberOfSubjects : true);
    setSchedule(schedules);
  }

  const onChangeSchedulePage = (page: number) => {
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
    <div className="min-h-screen flex flex-col md:flex-row">
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
      <div className="p-5 pl-2 h-full md:w-4/6 md:p-5">
        <button
          onClick={toggleSideBar}
          className="sticky font-medium mt-2 px-3 py-3 top-20 z-30 rounded-lg border-2 border-gray-500 bg-white text-black dark:bg-gray-800 dark:text-gray-100 flex flex-row justify-center gap-2 transition-colors duration-300 hover:bg-gray-700 dark:hover:bg-gray-900 active:bg-gray-600 dark:active:bg-gray-800 md:hidden"
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

        <div className=" grid grid-cols-6 grid-rows-2 ml-10 justify-between items-center mb-2 p-2 md:grid-rows-1">
          <div className="col-start-1 col-end-7 row-start-2 flex md:col-start-3 md:col-end-6 md:col-span-3 md:row-start-1 md:mt-0 ">
            <LiveIndicator isLive={true} />
            <div className="ml-3 md:mx-1" />
            Última actualización: 20 de marzo de 2025
          </div>
          <div className={`${schedule.length == 0 ? "opacity-0" : ""}  col-start-1 col-span-6 row-start-1  md:col-end-3 mr-5 md:row-start-1 border-2 rounded-lg border-gray-300 flex p-2`}>
            <p>
              Posibles horarios: {schedule.length}
            </p>
          </div>
          <div className={`transition-all duration-500 ${isSideBarOpen && dayFormat === "short" ? "opacity-0" : "flex justify-center items-center md:col-start-6  md:justify-self-end md:row-span-1"}`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedule.length - 1}
              isPreviousDisabled={page == 0}
            />
          </div>
        </div>
        <Calendar dayFormat={dayFormat} courses={schedule[page]?.courses} />

      </div>
    <div className="md:w-1/6 md:m-5 md:ml-0 px-4 pb-4 mb-20 mt-10">
      {schedule.length > 0 ? (<CurrentSchedule schedule={schedule[page]} />) : (

        <>

          <div className=" flex">

            <p className="text-center mt-10">Sin horarios disponibles</p>


          </div>
        </>

      )}
    </div>
      

    </div >
  );
};
export default CalendarPage;
