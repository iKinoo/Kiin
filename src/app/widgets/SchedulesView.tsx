import { Schedule } from '@/domain/entities/Schedule';
import Calendar from '../components/Calendar';
import Pagination from '../components/Pagination';
// import SliderFilter from '../components/SliderBar';
import LiveIndicator from '../components/UpdateIndicator';
import SliderFilter from '../components/SliderBar';

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
    <div className="flex-1 overflow-auto  flex-col md:h-full">

      <div className="md:h-full  md:p-5 flex flex-col">


        <div className=" grid grid-cols-6 grid-rows-1 justify-between items-center mb-2 px-5 mt-5 md:mt-0 md:px-2   ">
          <div className="col-start-1  md:row-start-1 col-span-6  mb-5 justify-center   row-start-1 flex  self-start">
            <LiveIndicator isLive={true} />
            <div className='ml-2'> </div>
            20 de mayo de
          </div>
          <div className=" md:row-start-2 col-start-1 col-span-4  ">
            <SliderFilter maxValue={maxSubjectsCount} label='Materias por horario' objectNameCounting='materias' onValueChange={handleSliderChange} />
          </div>
          <div className={` justify-center  items-center  col-start-6 md:col-start-5 md:col-span-1   w-full md:row-start-2  row-start-2   flex flex-col`}>
            Horarios
            <div className=' text-white  bg-black dark:bg-white dark:text-black px-2 rounded-full' style={{ lineHeight: 1.5 }}>
              {schedulesToShow.length}
            </div>
          </div>


          <div className={` transition-all duration-500 ${isSideBarOpen && dayFormat === "short" ? "opacity-0" : "flex justify-center items-center col-start-6  justify-self-end md:row-start-2"}`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedulesToShow.length - 1}
              isPreviousDisabled={page == 0} />
          </div>

        </div>
        <div className=' flex-1 overflow-auto'>
          <Calendar dayFormat={dayFormat} courses={schedulesToShow[page]?.courses} />
        </div>

      </div>



    </div>
  );

}

export default SchedulesView