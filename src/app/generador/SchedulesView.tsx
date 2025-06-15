import { Schedule } from '@/domain/entities/Schedule';
import React from 'react'
import LiveIndicator from '../components/UpdateIndicator';
import Pagination from '../components/Pagination';
import SliderFilter from '../components/SliderBar';
import Calendar from '../components/Calendar';
import CurrentSchedule from '../components/CurrentSchedule';

interface SchedulesViewProps {
  
  isSideBarOpen: boolean;

  
  
  schedulesToShow: Schedule[];
  dayFormat: "short" | "long";
  onChangeSchedulePage: (page: number) => void;
  page: number;
  maxSubjectsCount: number;
  handleSliderChange: (value: number | number[]) => void;
}

function SchedulesView({
  
  isSideBarOpen,

  schedulesToShow,
  dayFormat,
  onChangeSchedulePage,
  page,
  maxSubjectsCount,
  handleSliderChange,

}: SchedulesViewProps) {



  return (
    <div className="flex-1 overflow-auto border-large border-green-500 flex-col md:flex-row">
      
      <div className="h-full md:w-4/6 md:p-5">
        

        <div className=" grid grid-cols-6 grid-rows-2justify-between items-center mb-2 px-5 mt-5 md:mt-0 md:px-2 md:grid-rows-2">
          <div className="col-start-1 col-end-7 row-start-1 flex md:col-start-3 md:col-end-6 md:col-span-3 md:row-start-1 md:mt-0 ">
            <LiveIndicator isLive={true} />
            <div className="ml-3 md:mx-1" />
            Última actualización: 20 de marzo de 2025
          </div>
          <div className={`${schedulesToShow.length == 0 ? "opacity-0" : ""} w-max col-start-1 col-span-6 row-start-2  md:col-end-3 mr-5 md:row-start-1 border-2 rounded-lg border-gray-300 flex p-2 mt-2 md:mt-0`}>
            <p>
              Posibles horarios: {schedulesToShow.length}
            </p>
          </div>
          <div className={`transition-all duration-500 ${isSideBarOpen && dayFormat === "short" ? "opacity-0" : "flex justify-center items-center md:col-start-6  md:justify-self-end md:row-span-1"}`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedulesToShow.length - 1}
              isPreviousDisabled={page == 0} />
          </div>
          <div className="md:col-start-1 md:col-end-4 md:row-start-2 col-start-1 col-span-6 mt-3">
            <SliderFilter maxValue={maxSubjectsCount} label='Materias por horario' objectNameCounting='materias' onValueChange={handleSliderChange} />
          </div>
        </div>
        <Calendar dayFormat={dayFormat} courses={schedulesToShow[page]?.courses} />

      </div>
      <div className="md:w-1/6 md:m-1  pb-4 mb-20 mt-10 mx-3 md:mx-3">
        {schedulesToShow.length > 0 ? (<CurrentSchedule schedule={schedulesToShow[page]} />) : (

          <>

            <div className=" flex">

              <p className="text-center mt-10">Sin horarios disponibles</p>


            </div>
          </>

        )}
      </div>


    </div>
  );

}

export default SchedulesView