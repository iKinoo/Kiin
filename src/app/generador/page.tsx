"use client";

import SchedulesView from "../widgets/SchedulesView";
import SubjectsView from "../widgets/SubjectsView";


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
import React, { useEffect, useState } from 'react';
import Pivot from "../../domain/entities/Pivot";



const GeneratorPage = () => {
  const [indexSelected, setIndexSelected] = useState(0);

  const [currentCategories, setCurrentCategories] = React.useState<Category[]>([]);
  const [generatedSchedules, setGeneratedSchedules] = React.useState<Schedule[]>([]);
  const [schedulesToShow, setSchedulesToShow] = useState<Schedule[]>([])
  const [page, setPage] = useState(0);
  const [isFilterCoursesEmpty, setIsFilterCoursesEmpty] = useState(false);

  const [selectedSubjectsCount, setSelectedSubjectsCount] = useState<number | number[]>(0);
  const [maxSubjectsCount, setMaxSubjectsCount] = useState<number>(0);



  const [pivots, setPivots] = useState<Pivot[]>([]);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedSubjectsCount(value);
  };

  useEffect(
    () => {
      if (typeof selectedSubjectsCount === "number" && selectedSubjectsCount > 0) {
        setSchedulesToShow(generatedSchedules.filter(gs => gs.courses.length === selectedSubjectsCount))
      } else {
        setSchedulesToShow(generatedSchedules)
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

  const filterCourses = async (categories: Category[]) => {
    setPage(0)
    const data = new CoursesCsvDatasource();
    const filter = new FilterImpl(categories.map((category) => category.toCourseFilter()));
    const courses = await data.getCoursesByFilter(filter)

    if (courses.length === 0) {
      setGeneratedSchedules([]);
      setIsFilterCoursesEmpty(true);
      return;
    }

    const generator = new ScheduleGenerator();
    const schedules = generator.generateSchedules(courses)

    const withPivots = schedules.filter(schedule => scheduleHasPivots(schedule, pivots))

    console.log(withPivots)
    setGeneratedSchedules(withPivots);
  }

  const scheduleHasPivots = (schedule: Schedule, pivots: Pivot[]) => {

    return (
      pivots.every((pivot) => (
        schedule.courses.some((course) => (
          (course.subject.id === pivot.idSubject)
          &&
          (course.professor.id === pivot.idProfessor)
        ))
      ))
    )
  }

  const onChangeSchedulePage = (page: number) => {
    setPage(page);
  };

  const handleClickFilter = (category: Category[]) => {
    setCurrentCategories(category);
    const semestersWithSubjectsSelected = category.filter(c => c instanceof SubjectCategory)

    let selectedSubjectsCount = 0;
    semestersWithSubjectsSelected.forEach(c => { selectedSubjectsCount = c.selectedValues.length + selectedSubjectsCount })

    // const testL = category.find(c => c instanceof SubjectCategory)?.selectedValues.length ?? 0;

    setMaxSubjectsCount(selectedSubjectsCount);
  }

  useEffect(() => {
    if (isFilterCoursesEmpty) {
      alert('No hay cursos disponibles con los filtros seleccionados')
      setIsFilterCoursesEmpty(false)
    }
  }, [isFilterCoursesEmpty])


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

  const handleSwitchView = (index: number) => {
    console.log(index);
    setIndexSelected(index);
  }

  const subjectsView = () => {
    return <SubjectsView
      pivots={pivots}
      setPivots={setPivots}
      key={0}
      toggleSideBar={toggleSideBar}
      isSideBarOpen={isSideBarOpen}
      currentCategories={currentCategories}
      handleClickFilter={handleClickFilter}
      filterCourses={filterCourses}
    />
  }

  const schedulesView = () => {
    return <SchedulesView
      pivots={pivots}
      key={1}
      isSideBarOpen={isSideBarOpen}
      schedulesToShow={schedulesToShow}
      dayFormat={dayFormat}
      onChangeSchedulePage={onChangeSchedulePage}
      page={page}
      maxSubjectsCount={maxSubjectsCount}
      handleSliderChange={handleSliderChange} />
  }



  return <div className="flex flex-1 flex-col  overflow-auto  ">
    <div className="flex flex-col flex-1 overflow-auto   relative">

      {dayFormat == "long" ?
        <div>
          {subjectsView()}
          {schedulesView()}
        </div>
        : (indexSelected == 0 ? subjectsView() : schedulesView())}


    </div>
    <div className=" border-t-large border-gray-700 p-2 gap-3 flex flex-row justify-center z-20 bg-gray-800 fixed bottom-1 self-center w-full md:hidden">

      <ButtonSwitchView index={0} isSelected={0 == indexSelected} label={"Materias"} onClick={handleSwitchView} />
      <ButtonSwitchView index={1} isSelected={1 == indexSelected} label={"Horarios"} onClick={handleSwitchView} />
    </div>
  </div>
};
export default GeneratorPage;



interface ButtonSwitchViewProps {
  label: string;
  isSelected: boolean;
  onClick: (index: number) => void;
  index: number;
}

const ButtonSwitchView = ({ isSelected, label, onClick, index }: ButtonSwitchViewProps) => {

  return (
    <button
      onClick={() => {
        onClick(index)
      }}
      className={`rounded-lg p-2 border-2 border-gray-500 ${isSelected ? "bg-gray-700" : ""}`}>
      {label}
    </button>
  )
}
