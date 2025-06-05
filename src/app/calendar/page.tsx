"use client";
import Category from "@/domain/entities/Category";
import { Course } from "@/domain/entities/Course";
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
import Calendar from "../components/Calendar";
import FilterSelector from "../components/FilterSelector";
import Pagination from "../components/Pagination";
import SideBar from "../components/SideBar";
import LiveIndicator from "../components/UpdateIndicator";
import { Schedule } from "@/domain/entities/Schedule";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import GoogleCalendarButton from "../components/GoogleCalendarButton";
const CalendarPage = () => {
  const [events, setEvents] = useState<
    { color: string; title: string; start: string; end: string }[]
  >([]);
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
      setEvents([]);
      setIsFilterCoursesEmpty(true);
      return;
    }

    const generator = new ScheduleGenerator();
    const numberOfSubjects = Array.isArray(selectedSubjectsCount) ? selectedSubjectsCount[0] : selectedSubjectsCount;
    const schedules = generator.generateSchedules(courses).filter((schedule) => numberOfSubjects > 0 ? schedule.courses.length === numberOfSubjects : true);
    setSchedule(schedules);
    const eventsData = getEvents(schedules, 0);
    setEvents(eventsData);
  }

  const getEvents = (schedule: Schedule[], index: number) => {
    if (schedule.length === 0) {
      return [];
    }
    return schedule[index].courses.flatMap((course) => {
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

  //Prueba de google
  const [start] = useState(new Date('2025-06-05T08:00:00'));
  const [end] = useState(new Date('2025-06-28T09:00:00'));
  const session = useSession();
  const supabase = useSupabaseClient();
  async function GoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        
      }
    });
    if (error) {
      console.error('Error signing in:', error.message);
      alert('Error signing in: ' + error.message);
    }
  }

  async function GoogleSignOut() {
    await supabase.auth.signOut();
  }
  //google termina

  const [showShareLink, setShowShareLink] = useState<string | null>(null);

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
        <Calendar events={events} dayFormat={dayFormat} />

      </div>
      <div className="md:w-1/5 md:m-5 md:ml-0 px-4 pb-4 mb-20 mt-10">
        <h2 className="text-center text-xl font-bold my-4">Horario Actual</h2>

         {schedule.length > 0 ? (
          <>
          {session ? (
                    <div>
                                      
                                      {/*<button onClick={GoogleSignOut}>Sign Out</button>*/}
                                      {session && session.expires_at && session.expires_at < Date.now() / 1000 ? (
                  <div className="mb-4">
                    <button
                      onClick={async () => {
                        const Swal = (await import('sweetalert2')).default;
                        await Swal.fire({
                          icon: 'info',
                          title: 'Sesión expirada',
                          text: 'Tu sesión de Google ha expirado. Por favor, inicia sesión nuevamente para exportar tu horario.',
                          confirmButtonText: 'Iniciar sesión'
                        });
                        await GoogleSignIn();
                      }}
                      className="px-4 py-2 rounded-lg bg-[rgb(168,85,247)] text-white font-semibold shadow hover:bg-[rgb(139,54,232)] transition-colors duration-200"
                    >
                      Iniciar sesión con Google
                    </button>
                  </div>
                ) : (
                  <GoogleCalendarButton
                    schedule={schedule[page]}
                    recurrenceStart={start}
                    recurrenceEnd={end}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-row mb-3 gap-2 justify-center items-center  h-[7%]">

                <button
                  onClick={async () => {
                    const Swal = (await import('sweetalert2')).default;
                    await Swal.fire({
                      icon: 'info',
                      title: 'Acceso requerido',
                      text: 'Debes iniciar sesión con Google para exportar tu horario.',
                      confirmButtonText: 'Iniciar sesión'
                    });
                    await GoogleSignIn();
                  }}
                  className="h-full px-4 py-2 rounded-lg bg-[rgb(168,85,247)] text-white font-semibold shadow hover:bg-[rgb(139,54,232)] transition-colors duration-200"
                >
                  Agregar a Google Calendar
                </button>
              
                <div className="relative  h-full">
                  <button
                    
                    onClick={async () => {
                      const coursesIds = schedule[page].courses.map(course => course.id);
                      const shareLink = `https://kiin.live/calendar/horario?ids=${coursesIds.toString()}`;
                      setShowShareLink(shareLink);
                    }}
                    className="h-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-[rgb(139,54,232)] transition-colors duration-200"
                  >
                    Compartir
                  </button>
                  {showShareLink && (
                    <div className="absolute right-1 mt-2 w-max bg-gray-800 border  border-gray-700 rounded shadow-xl p-2 z-10 flex items-center gap-2">
                      <span className="text-xs break-all text-white">{showShareLink}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(showShareLink);
                        }}
                        className="ml-2 px-2 py-1 text-xs text-black bg-white rounded hover:bg-gray-300"
                      >
                        Copiar
                      </button>
                      <button
                        onClick={() => setShowShareLink(null)}
                        className="ml-1 px-2 py-1 text-xs text-black bg-white rounded hover:bg-gray-200"
                        aria-label="Cerrar"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                

              </div>
            )}
            {schedule[page].courses.map((course, index) => (
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
            ))}
          </>
        ) : (
          <div className="gap-5">
            <p className="text-center">Sin cursos disponibless</p>
            {/* <div className="bg-white">
              <AdBanner
                dataAdSlot="7039104578"
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
              />
            </div> */}
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
      borderColor: color,
      extendedProps: {
        room: sessionI.room,
        professor: course.professor.fullName
      },
    };
  });
}
export default CalendarPage;
