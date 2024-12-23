import { Course } from '@/domain/entities/Course'
import React from 'react'

type Props = { course: Course[], isSelected: boolean }

function ScheduleCard({ course, isSelected }: Props) {

    return (
        <div className={`" ${isSelected ? "bg-slate-900" : ''} mx-1 p-2 rounded-lg border-2 dark:border-gray-800"`}>
            <button className='w-full '>
                <h6 className='text-gray-400 text-left overflow-hidden text-nowrap'>Horario</h6>
                {course.map((course, index) => (
                    <div key={index} className=' overflow-hidden dark:bg-gray-800 bg-gray-200 rounded-lg mt-1 px-1'>
                        <p className='text-nowrap text-left'>{course.subject.name}</p>
                    </div>
                ))}
            </button>
        </div>
    )
}

export default ScheduleCard