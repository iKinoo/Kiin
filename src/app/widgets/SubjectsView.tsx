import Category from '@/domain/entities/Category';
import { Professor } from '@/domain/entities/Professor';
import { Subject } from '@/domain/entities/Subject';
import SubjectCategory from '@/domain/entities/SubjectCategory';
import { ProfessorsCsvDataSource } from '@/infrastructure/datasource/ProfessorsCsvDataSource';
import { useEffect, useState } from 'react';
import Pivot from '../../domain/entities/Pivot';
import FilterSelector from '../components/FilterSelector';
import SideBar from '../components/SideBar';

interface SubjctsViewProps {
    toggleSideBar: () => void;
    isSideBarOpen: boolean;
    currentCategories: Category[];
    handleClickFilter: (category: Category[]) => void;
    filterCourses: (categories: Category[]) => Promise<void>;
    setPivots: (ids: Pivot[]) => void,
    pivots: Pivot[];

}



function SubjectsView({
    toggleSideBar,
    isSideBarOpen,
    currentCategories,
    handleClickFilter,
    filterCourses,
    pivots,
    setPivots

}: SubjctsViewProps) {



    const [professorsData, setProfessorsData] = useState<Professor[]>([])

    const getProfessors = async () => {
        const professorsDataSource = new ProfessorsCsvDataSource()
        const professorsData = await professorsDataSource.getAll();
        setProfessorsData(professorsData)
    }

    useEffect(() => {
        getProfessors()
    }, [])



    useEffect(() => {
        console.log(pivots)
    }, [pivots])

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
            <div className='border-large border-red-500 flex-1 overflow-auto flex flex-col gap-2 p-4 pb-24'>

                {currentCategories?.filter(c => c instanceof SubjectCategory).map(
                    (sb) => (
                        (
                            sb.selectedValues?.map(
                                (sbv) => (
                                    <SubjectCard pivots={pivots} setPivots={setPivots} key={sbv.id} subject={sbv} allProfessors={professorsData} />
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
    subject: Subject;
    allProfessors: Professor[]
    setPivots: (ids: Pivot[]) => void,
    pivots: Pivot[];
}

const colors = [
    "#AA6AFF",
    "#00B0FF",
    "#FF70E9",
    "#FFA647",
    "#6D8CFF",
    "#FF5C8A",
    "#4DFFB8",
    "#FFD94D",
    "#B570FF",
    "#4F6CFF",
]



function SubjectCard({ subject, allProfessors, pivots, setPivots }: SubjectCardProps) {

    const [showProfessors, setShowProfessors] = useState(false);

    return <div className='border-2 border-gray-600 rounded-large p-2 px-2'>

        <div className='flex flex-row '>
            <div className='  flex-1 mr-2'>
                {subject.name}
                <div className='h-1 rounded-large  mb-1 mt-1 w-full' style={{ backgroundColor: colors[subject.id % colors.length] }}></div>
            </div>
            <svg className='inline ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>

        </div>

        <div className='flex flex-row items-center gap-2 text-gray-400 mb-2'>
            {subject.type}
            <div className='h-2 w-2 rounded-large bg-gray-400 inline-block'></div>
            {(Array.from((new Set(subject.semestre)))).join("°, ")}
            <div className='h-2 w-2 rounded-large bg-gray-400 inline-block'></div>
            8 Créditos
        </div>

        <div className='flex flex-row justify-end'>
            <button
                onClick={
                    () => setShowProfessors(!showProfessors)
                }
                className={`flex flex-row items-center border border-gray-500 rounded-lg w-max p-2 text-sm ${showProfessors ? "bg-gray-700" : "bg-gray-800"}`}>
                {showProfessors ?
                    <svg className='inline mr-1' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                    : <svg className='inline mr-1' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                }
                <span className='' style={{ lineHeight: 0 }}>
                    Profesores
                </span>
            </button>
        </div>
        <div className={`flex flex-col gap-1 ${showProfessors ? "static" : "hidden"}`}>
            {allProfessors.filter(professor => subject.professors.includes(professor.id)).map(e => (
                <ProfessorRow setPivots={setPivots} pivots={pivots} key={e.id} professor={e} idSubject={subject.id}></ProfessorRow>
            ))}
        </div>
    </div>
}

export default SubjectsView


function ProfessorRow({ professor, setPivots: setSelectedProfessors, pivots: selectedPivots, idSubject }
    : {
        professor: Professor,
        setPivots: (ids: Pivot[]) => void,
        pivots: Pivot[];
        idSubject: number
    }) {

    const isSelected = selectedPivots.some(
        selectedPivot => (
            selectedPivot.idProfessor === professor.id && selectedPivot.idSubject == idSubject
        )
    );



    return (
        <div key={professor.id} className=' flex flex-row  border-green-500'>
            <button
                onClick={() => {
                    if (isSelected) {
                        setSelectedProfessors(selectedPivots.filter(pivot => pivot.idProfessor != professor.id));
                    } else {
                        setSelectedProfessors([...selectedPivots, { idProfessor: professor.id, idSubject: idSubject }]);
                    }
                }}
                className={`border-2 border-gray-800 ${isSelected ? "bg-gray-700 " : ""}  rounded-large h-max p-1 flex flex-row mr-2 `}>
                {isSelected ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M680-840v80h-40v327l-80-80v-247H400v87l-87-87-33-33v-47h400ZM480-40l-40-40v-240H240v-80l80-80v-46L56-792l56-56 736 736-58 56-264-264h-6v240l-40 40ZM354-400h92l-44-44-2-2-46 46Zm126-193Zm-78 149Z" /></svg>
                    : <svg className='inline ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg>
                }


                {isSelected ? "Fijado" : "Fijar"}
            </button>
            <span className='mt-2 border-red-500'>
                {professor.fullName}
            </span>
        </div>
    )
}