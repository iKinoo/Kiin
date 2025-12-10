import { Schedule } from '@/domain/entities/Schedule';
import Calendar from '../components/Calendar';
import Pagination from '../components/Pagination';
// import SliderFilter from '../components/SliderBar';
import Image from 'next/image';
import SliderFilter from '../components/SliderBar';
import LiveIndicator from '../components/UpdateIndicator';

interface SchedulesViewProps {

  schedulesToShow: Schedule[];
  dayFormat: "short" | "long";
  onChangeSchedulePage: (page: number) => void;
  page: number;
  maxSubjectsCount: number;
  defaultSubjectsCount: number;
  handleSliderChange: (value: number | number[]) => void;
}

function SchedulesView({
  schedulesToShow,
  dayFormat,
  onChangeSchedulePage,
  page,
  maxSubjectsCount,
  defaultSubjectsCount,
  handleSliderChange,
}: SchedulesViewProps) {

  return (
    <div className="flex-1 overflow-auto  flex-col md:h-full">

      <div className="md:h-full  md:p-5 flex flex-col">


        <div className=" grid grid-cols-6 grid-rows-1 justify-between items-center mb-2 px-5 mt-5 md:mt-0 md:px-2   ">
          <div className="col-start-1  md:row-start-1 col-span-6  mb-5 justify-center   row-start-1 flex  self-start">
            <LiveIndicator isLive={true} />

          </div>
          <div className=" md:row-start-2 col-start-1 col-span-4 md:col-span-3 ">
            <SliderFilter maxValue={maxSubjectsCount} defaultValue={defaultSubjectsCount} label='Materias por horario' objectNameCounting='materias' onValueChange={handleSliderChange} />
          </div>
          <div className={` justify-center  items-center  col-start-6 md:col-start-5 md:col-span-1   w-full md:row-start-2  row-start-2   flex flex-col`}>
            Horarios
            <div className=' text-white  bg-black dark:bg-white dark:text-black px-2 rounded-full' style={{ lineHeight: 1.5 }}>
              {schedulesToShow.length}
            </div>
          </div>


          <div className={`flex justify-center items-center col-start-6 justify-self-end md:row-start-2`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedulesToShow.length - 1}
              isPreviousDisabled={page == 0} />
          </div>

        </div>
        <div className=' flex-1 overflow-auto  relative'>
          <Calendar dayFormat={dayFormat} courses={schedulesToShow[page]?.courses} />
          {schedulesToShow.length < 1 && <div className='absolute bottom-0 w-full h-full  flex justify-center items-center '>
            <Image src={"/img/fantasmita.svg"} alt='Fantasmita' width={400} height={400}></Image>
          </div>}
        </div>




      </div>



    </div>
  );

}

export default SchedulesView