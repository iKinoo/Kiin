import Category from '@/domain/entities/Category';
import React from 'react'
import SideBar from '../components/SideBar';
import FilterSelector from '../components/FilterSelector';

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
        <>
            <SideBar toggleSideBar={toggleSideBar} isOpen={isSideBarOpen}>
                <FilterSelector
                    categories={currentCategories}
                    onClick={handleClickFilter}
                    onSubmit={() => filterCourses(currentCategories)}
                    toggleSideBar={toggleSideBar} />
            </SideBar>

            <button
                onClick={toggleSideBar}
                className="sticky font-medium mt-2 px-3 py-3 top-20 z-10 rounded-lg border-2 border-gray-500 bg-white text-black dark:bg-gray-800 dark:text-gray-100 flex flex-row justify-center gap-2 transition-colors duration-300 hover:bg-gray-700 dark:hover:bg-gray-900 active:bg-gray-600 dark:active:bg-gray-800 md:hidden"
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
        </>
    );

}

export default SubjectsView