import { Course } from '@/domain/entities/Course'
import React, { ReactNode } from 'react'

type Props = { course: Course, index: number }

function CourseCard({ course, index }: Props) {

    const semesters = course.subject.semestre.map((e, index, arg) => { return e + (index + 1 == arg.length ? '' : ', ') })

    return (
        <div key={index} className="mb-4 border-2 p-4 rounded-lg dark:border-gray-800 text-small dark:bg-slate-900">
            <h3 className=" font-semibold">{course.subject.name}</h3>
            <CourseCardField label="Modalidad:" value={course.modality} />
            <CourseCardField label="Profesor:" value={course.professor.fullName} />

            <div className='flex flex-wrap gap-2'>
                <CourseCardField label="Grupo:" value={course.group.toString()} />
                <CourseCardField label="Semestre: " value={semesters} />

            </div>
            <CourseCardField label="Carrera:" value={course.subject.degreeResume} />
        </div>
    )
}

export default CourseCard

type CourseCardFieldProps<T> = { label: string, value: T }

function CourseCardField<S>({ label, value }: CourseCardFieldProps<S>) {

    const style = 'mt-1  rounded-lg p-1 bg-gray-200 dark:bg-gray-800'
    return (
        <p className={style}><span className='font-semibold'>{label}</span> {value as ReactNode}</p>
    )

}