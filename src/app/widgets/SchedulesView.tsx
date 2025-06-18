import { Schedule } from '@/domain/entities/Schedule';
import Calendar from '../components/Calendar';
import Pagination from '../components/Pagination';
import SliderFilter from '../components/SliderBar';
import LiveIndicator from '../components/UpdateIndicator';

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
    <div className="flex-1 overflow-auto border-large border-purple-500 flex-col md:flex-row">

      <div className="border-large border-blue-500 h-max  md:p-5">


        <div className=" grid grid-cols-6 grid-rows-2 justify-between items-center mb-2 px-5 mt-5 md:mt-0 md:px-2 md:grid-rows-2">
          <div className="col-start-1 col-span-6 mt-3">
            <SliderFilter maxValue={maxSubjectsCount} label='Materias por horario' objectNameCounting='materias' onValueChange={handleSliderChange} />
          </div>

          <div className={`w-max col-start-1  row-start-2   border-2 rounded-lg border-gray-300 flex p-2 mt-2 `}>
            <p>
              Posibles: {schedulesToShow.length}
            </p>
          </div>
          <div className="col-start-4 md:col-start-3 col-span-2  row-start-2 flex ">
            <LiveIndicator isLive={true} />
            <div className="ml-3" />
            20/mar/25
          </div>
          <div className={`transition-all duration-500 ${isSideBarOpen && dayFormat === "short" ? "opacity-0" : "flex justify-center items-center col-start-6  justify-self-end row-span-1"}`}>
            <Pagination
              onNext={() => onChangeSchedulePage(page + 1)}
              onPrevious={() => onChangeSchedulePage(page - 1)}
              isNextDisabled={page >= schedulesToShow.length - 1}
              isPreviousDisabled={page == 0} />
          </div>

        </div>
        <Calendar dayFormat={dayFormat} courses={schedulesToShow[page]?.courses} />

      </div>



    </div>
  );

}

export default SchedulesView