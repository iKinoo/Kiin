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
  showConflicts?: boolean;
}

function SchedulesView({
  schedulesToShow,
  dayFormat,
  onChangeSchedulePage,
  page,
  maxSubjectsCount,
  defaultSubjectsCount,
  handleSliderChange,
  showConflicts = false,
}: SchedulesViewProps) {

  return (
    <div className="flex-1 overflow-auto  flex-col md:h-full ">

      <div className="md:h-full  md:p-5 flex flex-col ">


        <div className="grid grid-cols-6 grid-rows-1 justify-between items-center mb-2 px-5 mt-5 md:mt-0 md:px-2">
          <div className="md:row-start-1 col-start-1 col-span-4 md:col-span-3 -blue-500">
            <SliderFilter maxValue={maxSubjectsCount} defaultValue={defaultSubjectsCount} label='Materias por horario' objectNameCounting='materias' onValueChange={handleSliderChange} />
          </div>
          <div className={`justify-center items-center col-start-6 md:col-start-5 md:col-span-1 w-full md:row-start-1 row-start-1 flex`}>
            <h2 className="text-center text-lg px-3 py-1 font-bold bg-black rounded-full text-white dark:bg-white dark:text-black whitespace-nowrap">
              Horario {page + 1}/{schedulesToShow.length}
            </h2>
          </div>

          <div className={`flex justify-center items-center col-start-6 justify-self-end md:row-start-1`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedulesToShow.length - 1}
              isPreviousDisabled={page == 0} />
          </div>
        </div>
        
        <div className='flex-1 overflow-auto relative'>
          <Calendar
            dayFormat={dayFormat}
            courses={schedulesToShow[page]?.courses}
            conflictCourses={showConflicts ? schedulesToShow[page]?.incompatibleCourses : undefined}
          />
          {schedulesToShow.length < 1 && <div className='absolute bottom-0 w-full h-full flex justify-center items-center'>
            <Image src={"/img/fantasmita.svg"} alt='Fantasmita' width={400} height={400}></Image>
          </div>}
        </div>

        {/* Materias y Créditos justo debajo del calendario */}
        {schedulesToShow[page] && (
          <div className="flex justify-center gap-4 py-2 px-5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Materias:</span>
              <div className="text-white bg-black dark:bg-white dark:text-black px-2 rounded-full" style={{ lineHeight: 1.5 }}>
                {schedulesToShow[page]?.subjects?.length ?? 0}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Créditos:</span>
              <div className="text-white bg-black dark:bg-white dark:text-black px-2 rounded-full" style={{ lineHeight: 1.5 }}>
                {schedulesToShow[page]?.subjects?.reduce((sum, subject) => sum + subject.credits, 0) ?? 0}
              </div>
            </div>
          </div>
        )}

        {/* Fecha de actualización en el footer */}
        <div className="flex justify-center items-center gap-2 py-3 px-5 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Última fecha de actualización de horarios:
          </span>
          <LiveIndicator isLive={true} />
        </div>




      </div>



    </div>
  );

}

export default SchedulesView