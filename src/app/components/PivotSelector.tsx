"use client"

import React from 'react'
import PivotProfessorSelector from './PivotProfessorSelector';
import { Subject } from '@/domain/entities/Subject';
import { Professor } from '@/domain/entities/Professor';
import { Course } from '@/domain/entities/Course';

interface PivotSelectorProps {
    subjects: Subject[]
    professors: Professor[]
    courses: Course[]
    schedules: Course[][]
    onSubmit: () => void
    onClick: (professorId: number, subjectId: number, isSelected: boolean) => void
}


const PivotSelector: React.FC<PivotSelectorProps> = ({ subjects, onSubmit, courses, professors, onClick}) => {
    // const refreshCategories = (categoryIndex: number, valueId: number) => {

    //     const category = newCategories[categoryIndex]
    //     // category.onClick(valueId);
    //     newCategories[categoryIndex] = category;
    //     // categories.forEach((cat) => cat.filterWithCategories(newCategories));
    //     onClick(newCategories);
    // }

    return (
        <div className="px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
                <li className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white group'>
                    <span className="ms-3">Filtrar horarios por preferencia:</span>
                </li>
                {
                    subjects.map((subject, index) => (
                        <PivotProfessorSelector key={index} subject={subject} onClick={onClick} courses={courses} schedules={[]} professors={professors} />
                    ))
                }
                <li>
                    <button onClick={onSubmit} className="justify-self-center block mt-12 py-2 px-10 bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                        Aplicar
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default PivotSelector