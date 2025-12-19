"use client";

import FilterSelector from "../components/FilterSelector";
import SchedulesView from "../widgets/SchedulesView";

import Category from '@/domain/entities/Category';
import { Degree } from '@/domain/entities/Degree';
import DegreeCategory from '@/domain/entities/DegreeCategory';
import { Schedule } from '@/domain/entities/Schedule';
import { ScheduleGenerator } from '@/domain/entities/ScheduleGenerator';
import { Subject } from '@/domain/entities/Subject';
import SubjectCategory from '@/domain/entities/SubjectCategory';
import { CoursesCsvDatasource } from '@/infrastructure/datasource/CoursesCsvDatasource';
import { DegreesCsvDataSource } from '@/infrastructure/datasource/DegreesCsvDataSource';
import { FilterImpl } from '@/infrastructure/datasource/FilterImpl';
import { SubjectsCsvDataSource } from '@/infrastructure/datasource/SubjectsCSvDataSource';
import React, { useCallback, useEffect, useState } from 'react';
import Pivot from "../../domain/entities/Pivot";
import CurrentSchedule from "../widgets/CurrentSchedule";



const GeneratorPage = () => {
  const [indexSelected, setIndexSelected] = useState(0);

  const [currentCategories, setCurrentCategories] = React.useState<Category[]>([]);
  const [generatedSchedules, setGeneratedSchedules] = React.useState<Schedule[]>([]);
  const [schedulesToShow, setSchedulesToShow] = useState<Schedule[]>([])
  const [page, setPage] = useState(0);
  const [isFilterCoursesEmpty, setIsFilterCoursesEmpty] = useState(false);

  const [selectedSubjectsCount, setSelectedSubjectsCount] = useState<number | number[]>(0);
  const [maxSubjectsCount, setMaxSubjectsCount] = useState<number>(0);
  const [defaultSubjectsCount, setDefaultSubjectsCount] = useState<number>(0);



  const [pivots, setPivots] = useState<Pivot[]>([]);
  const [pinnedSubjects, setPinnedSubjects] = useState<number[]>([])
  const [generationMessage, setGenerationMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showConflicts, setShowConflicts] = useState<boolean>(false);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedSubjectsCount(value);
  };

  useEffect(
    () => {
      if (typeof selectedSubjectsCount === "number" && selectedSubjectsCount > 0) {
        const filtered = generatedSchedules.filter(gs => gs.courses.length === selectedSubjectsCount);
        setSchedulesToShow(filtered);

        // Mostrar mensaje de filtrado
        if (generatedSchedules.length > 0) {
          setGenerationMessage(`${filtered.length} Horarios con ${selectedSubjectsCount} materias`);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
        }
      } else {
        setSchedulesToShow(generatedSchedules);
      }
      setPage(0)
    }, [generatedSchedules, selectedSubjectsCount]
  )

  const mapCategories = async () => {

    const degrees: Degree[] = await (new DegreesCsvDataSource()).getAll();
    const degreesCategory: Category = new DegreeCategory("Carrera", degrees);
    const subjects: Subject[] = await (new SubjectsCsvDataSource()).getAll();
    const semesters: SubjectCategory[] = Array(9).fill(0).map((_, index) => new SubjectCategory(index + 1, subjects))

    setCurrentCategories([degreesCategory,
      ...semesters
    ]);
  };

  const filterCourses = useCallback(async (categories: Category[]) => {
    setPage(0)
    setGenerationMessage("Generando horarios...");
    setShowMessage(true);

    const data = new CoursesCsvDatasource();
    const filter = new FilterImpl(categories.map((category) => category.toCourseFilter()));
    const courses = await data.getCoursesByFilter(filter)

    if (courses.length === 0) {
      setGeneratedSchedules([]);
      setIsFilterCoursesEmpty(true);
      setShowMessage(false);
      return;
    }

    const generator = new ScheduleGenerator();
    const schedules = generator.generateSchedules(courses)

    const withPivots = schedules.filter(schedule => withPinnedSubjects(schedule, pinnedSubjects)).filter(s => scheduleHasPivots(s, pivots))

    console.log(withPivots)
    const sorted = withPivots.sort((a, b) => a.courses.length - b.courses.length);

    // Calcular el número de materias del horario con más materias
    const maxCoursesInSchedules = sorted.length > 0 ? Math.max(...sorted.map(s => s.courses.length)) : 0;
    setDefaultSubjectsCount(maxCoursesInSchedules);

    setGeneratedSchedules(sorted);
    setGenerationMessage(`${sorted.length} Horarios Generados!`);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [pinnedSubjects, pivots]);

  const withPinnedSubjects = (schedule: Schedule, pinnedSubjects: number[]) => {
    return (
      pinnedSubjects.every(pinnedS => (
        schedule.courses.some(
          course => (course.subject.id === pinnedS)
        )
      ))
    )
  }

  const scheduleHasPivots = (schedule: Schedule, pivots: Pivot[]) => {
    // Agrupar pivotes por materia
    const pivotsBySubject = pivots.reduce((acc, pivot) => {
      if (!acc[pivot.idSubject]) {
        acc[pivot.idSubject] = [];
      }
      acc[pivot.idSubject].push(pivot.idProfessor);
      return acc;
    }, {} as { [subjectId: number]: number[] });

    // Verificar que para cada materia que tenga pivotes, el profesor del curso esté en la lista de profesores válidos
    return Object.entries(pivotsBySubject).every(([subjectId, professorIds]) => {
      const subjectIdNum = parseInt(subjectId);
      const courseForSubject = schedule.courses.find((course) => course.subject.id === subjectIdNum);

      if (courseForSubject) {
        // Si el horario tiene esta materia, verificar que el profesor esté en los pivotes
        return professorIds.includes(courseForSubject.professor.id);
      } else {
        // Si no tiene la materia, no hay restricción
        return true;
      }
    });
  }

  const onChangeSchedulePage = (page: number) => {
    setPage(page);
  };

  const handleClickFilter = (categories: Category[]) => {
    setCurrentCategories(categories);

    const semestersWithSubjectsSelected = categories.filter(c => c instanceof SubjectCategory)
    const selectedSubjects = semestersWithSubjectsSelected.flatMap(s => s.selectedValues.flatMap(sv => sv.id))
    setPinnedSubjects(pinnedSubjects.filter(pn => selectedSubjects.includes(pn)))
    setPivots(pivots.filter(p => selectedSubjects.includes(p.idSubject)))

    let selectedSubjectsCount = 0;
    semestersWithSubjectsSelected.forEach(c => { selectedSubjectsCount = c.selectedValues.length + selectedSubjectsCount })

    // const testL = category.find(c => c instanceof SubjectCategory)?.selectedValues.length ?? 0;

    setMaxSubjectsCount(selectedSubjectsCount);
  }

  const handleProfessorSelect = (newPivots: Pivot[]) => {
    setPivots(newPivots);
  }

  // Generar horarios automáticamente cuando cambien las categorías, pivots o pinnedSubjects
  useEffect(() => {
    // Verificar que hay al menos una materia seleccionada
    const hasSelectedSubjects = currentCategories
      .filter(c => c instanceof SubjectCategory)
      .some(c => c.selectedValues && c.selectedValues.length > 0);

    if (currentCategories.length > 0 && hasSelectedSubjects) {
      filterCourses(currentCategories);
    }
  }, [currentCategories, pivots, pinnedSubjects, filterCourses]);

  useEffect(() => {
    if (isFilterCoursesEmpty) {
      alert('No hay cursos disponibles con los filtros seleccionados')
      setIsFilterCoursesEmpty(false)
    }
  }, [isFilterCoursesEmpty])


  useEffect(() => {
    mapCategories();
  }, []);

  const [isFilterPanelCollapsed, setIsFilterPanelCollapsed] = useState(false);
  const [forceRenderKey, setForceRenderKey] = useState(0);

  // Forzar re-render después de que termine la animación de colapsar/expandir
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceRenderKey(prev => prev + 1);
    }, 350); // 350ms para dar tiempo a que termine la transición de 300ms
    
    return () => clearTimeout(timer);
  }, [isFilterPanelCollapsed]);

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

  const handleSwitchView = (index: number) => {
    console.log(index);
    setIndexSelected(index);
  }

  const schedulesView = () => {
    return <SchedulesView
      key={`schedules-${isFilterPanelCollapsed ? 'collapsed' : 'expanded'}-${forceRenderKey}`}
      schedulesToShow={schedulesToShow}
      dayFormat={dayFormat}
      onChangeSchedulePage={onChangeSchedulePage}
      page={page}
      maxSubjectsCount={maxSubjectsCount}
      defaultSubjectsCount={defaultSubjectsCount}
      handleSliderChange={handleSliderChange}
      showConflicts={showConflicts} />
  }



  return <div className="flex flex-1 flex-row overflow-hidden">
    {/* Backdrop para móvil cuando el panel está abierto */}
    {!isFilterPanelCollapsed && dayFormat == "short" && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsFilterPanelCollapsed(true)}
      />
    )}

    {/* Panel izquierdo fijo - Filtros de materias */}
    <div 
      className={`border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 flex flex-col transition-all duration-300 ease-in-out ${
        isFilterPanelCollapsed 
          ? 'w-0 min-w-0 overflow-hidden' 
          : dayFormat == "long" 
            ? 'w-[25%] min-w-[300px] h-full' 
            : 'fixed top-0 left-0 w-full h-full z-50'
      }`}
    >
      <div className={`p-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between ${isFilterPanelCollapsed ? 'hidden' : ''}`}>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center flex-1">
          Selecciona tus Materias
        </h2>
        <button
          onClick={() => setIsFilterPanelCollapsed(true)}
          className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          title="Ocultar panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto ${isFilterPanelCollapsed ? 'hidden' : ''}`}>
        <FilterSelector
          categories={currentCategories}
          onClick={handleClickFilter}
          onProfessorSelect={handleProfessorSelect}
          pivots={pivots}
        />
      </div>
    </div>

    {/* Botón para expandir el panel cuando está colapsado */}
    {isFilterPanelCollapsed && (
      <button
        onClick={() => setIsFilterPanelCollapsed(false)}
        className={`border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center justify-center ${
          dayFormat == "long" ? 'h-full w-10' : 'fixed top-16 left-0 h-12 w-12 rounded-br-lg shadow-lg z-50'
        }`}
        title="Mostrar panel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    )}

    {/* Mensajes de estado */}
    {showMessage && (
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
        {generationMessage}
      </div>
    )}

    {/* Contenido principal - Horarios */}
    <div className="flex flex-1 flex-col overflow-auto relative">
      {dayFormat == "long" ?
        <div className="flex flex-row h-full">
          <div className="flex-1">
            {schedulesView()}
          </div>
          <div className="w-[30%] border-l border-gray-300 dark:border-gray-700">
            <CurrentSchedule
              schedule={schedulesToShow[page]}
              pinnedSubjects={pinnedSubjects}
              pivots={pivots}
              label={`Horario ${page + 1}/${schedulesToShow.length}`}
              showConflicts={showConflicts}
              setShowConflicts={setShowConflicts}
            />
          </div>
        </div>
        : (
          <>
            <div className="flex-1">
              {schedulesView()}
              <CurrentSchedule
                schedule={schedulesToShow[page]}
                pinnedSubjects={pinnedSubjects}
                pivots={pivots}
                label={`Horario ${page + 1}/${schedulesToShow.length}`}
                showConflicts={showConflicts}
                setShowConflicts={setShowConflicts}
              />
            </div>
          </>
        )}
    </div>
  </div>
};
export default GeneratorPage;
