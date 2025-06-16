import Category from '@/domain/entities/Category';
import React from 'react'
import SideBar from '../components/SideBar';
import FilterSelector from '../components/FilterSelector';
import SubjectCategory from '@/domain/entities/SubjectCategory';
import { Subject } from '@/domain/entities/Subject';

interface SubjctsViewProps {
    toggleSideBar: () => void;
    isSideBarOpen: boolean;
    currentCategories: Category[];
    handleClickFilter: (category: Category[]) => void;
    filterCourses: (categories: Category[]) => Promise<void>;

}

function SubjectsView({
    toggleSideBar,
    isSideBarOpen,
    currentCategories,
    handleClickFilter,
    filterCourses,

}: SubjctsViewProps) {



    return (
        <div className='border-large border-white h-full flex flex-col'>
            <div className='flex flex-row gap-5 justify-center'>
                <button
                    onClick={toggleSideBar}
                    className="sticky font-medium  px-3 py-3  z-10 rounded-lg border-2 border-gray-500 bg-white text-black dark:bg-gray-800 dark:text-gray-100 flex flex-row justify-center gap-2 transition-colors duration-300 hover:bg-gray-700 dark:hover:bg-gray-900 active:bg-gray-600 dark:active:bg-gray-800 md:hidden"
                    type="button"
                >
                    Materias
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
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </button>
                <button onClick={() => { filterCourses(currentCategories) }} className="px-3 py-3  bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                    Generar Horarios
                </button>
            </div>
            <div className='border-large border-red-500 flex-1 overflow-auto flex flex-col gap-2 p-4'>

                {currentCategories?.filter(c => c instanceof SubjectCategory).map(
                        (sb) => (
                            (
                                sb.selectedValues?.map(
                                    (sbv) => (
                                        <SubjectCard key={sbv.id} subject={sbv} />
                                    )
                                )
                            )
                        )
                    )}

            </div>

            <SideBar toggleSideBar={toggleSideBar} isOpen={isSideBarOpen}>
                <FilterSelector
                    categories={currentCategories}
                    onClick={handleClickFilter}

                />
            </SideBar>



        </div>
    );

}

interface SubjectCardProps {
    subject: Subject
}


function SubjectCard({ subject }: SubjectCardProps) {
    return <div className='border-2 border-gray-600 rounded-large p-2 px-2'>

        <div className='flex flex-row '>
            <div className='  flex-1 mr-2'>
                {subject.name}
                <div className='h-1 rounded-large bg-blue-500 mb-1 mt-1 w-full'></div>
            </div>
            <svg className='inline ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>

        </div>

        <div className='flex flex-row items-center gap-2 text-gray-400 mb-2'>
            {subject.type}
            <div className='h-2 w-2 rounded-large bg-white inline-block'></div>
            {subject.semestre}
            <div className='h-2 w-2 rounded-large bg-white inline-block'></div>
            8 Créditos
        </div>

        <div className='flex flex-row justify-end'>
            <div className='border border-gray-500 rounded-md w-max self-end px-2  bg-gray-800'>
                <svg className='inline mr-1' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                Profesores
            </div>
        </div>
    </div>
}

export default SubjectsView