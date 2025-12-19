import { Schedule } from '@/domain/entities/Schedule';
import Calendar from '../components/Calendar';
import Pagination from '../components/Pagination';
// import SliderFilter from '../components/SliderBar';
import Image from 'next/image';
import { useState } from 'react';
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

  const [showShareLink, setShowShareLink] = useState<string | null>(null);

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
          <div className="flex justify-center gap-6 py-3 px-5">
            <div className="flex items-center gap-3">
              <span className="text-base font-medium text-gray-600 dark:text-gray-400">Materias:</span>
              <div className="text-white bg-black dark:bg-white dark:text-black px-4 py-1 rounded-full text-lg font-semibold min-w-[40px] text-center">
                {schedulesToShow[page]?.subjects?.length ?? 0}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-medium text-gray-600 dark:text-gray-400">Créditos:</span>
              <div className="text-white bg-black dark:bg-white dark:text-black px-4 py-1 rounded-full text-lg font-semibold min-w-[40px] text-center">
                {schedulesToShow[page]?.subjects?.reduce((sum, subject) => sum + subject.credits, 0) ?? 0}
              </div>
            </div>
          </div>
        )}

        {/* Botón de compartir */}
        {schedulesToShow[page] && (
          <div className="px-5 pb-3 relative">
            <ShareLinkButton schedule={schedulesToShow[page]} setShowShareLink={setShowShareLink} showShareLink={showShareLink} />
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

// Componente ShareLinkButton
type ShareLinkButtonProps = {
  schedule: Schedule;
  setShowShareLink: (link: string | null) => void;
  showShareLink: string | null;
}

function ShareLinkButton({ schedule, setShowShareLink, showShareLink }: ShareLinkButtonProps) {
    const [isCopied, setIsCopied] = useState(false);
    return (
        <>
            <button
                onClick={async () => {
                    const coursesIds = schedule.courses.map(course => course.id);
                    const shareLink = `${window.location.href}/horario?ids=${coursesIds.toString()}`;
                    setShowShareLink(shareLink);
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 transition-colors py-3 px-6 rounded-lg flex items-center justify-center gap-3 text-white font-medium text-base"
            >
                <svg className='' xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#ffffff"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>
                <span>Compartir horario</span>
            </button>
            {showShareLink &&
                <div className="absolute w-full animate-appearance-in flex flex-row items-center justify-center gap-3 dark:bg-[#111] bg-white p-1.5 rounded-lg left-0">
                    <div className="flex-1 text-xs dark:text-white text-black overflow-hidden truncate dark:bg-gray-800 dark:border-none border border-black p-2 py-2.5 rounded-md mx-2">
                        {showShareLink}
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(showShareLink);
                            setIsCopied(true);
                            setTimeout(() => {
                                setIsCopied(false);
                                setShowShareLink(null);
                            }, 1000);
                        }}
                        className="dark:text-white text-sm"
                    >
                        {isCopied ? 'Copiado!' : <svg className='inline dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>}
                    </button>
                    <button
                        onClick={() => setShowShareLink(null)}
                        className="text-white mr-2"
                        aria-label="Cerrar"
                    >
                        <svg className='dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
            }
        </>
    )
}

export default SchedulesView