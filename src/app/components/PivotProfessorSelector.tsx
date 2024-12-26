import { Course } from "@/domain/entities/Course";
import { Professor } from "@/domain/entities/Professor";
import { Subject } from "@/domain/entities/Subject";
import React, { useState } from "react";

interface PivotProps {
    subject: Subject;
    courses: Course[]
    schedules: Course[][]
    professors: Professor[]
    onClick: (professorId: number, subjectId: number, isSelected: boolean) => void;
}

const DropdownIcon = () => {
    return (
        <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
            />
        </svg>
    );
};

const ValueCell: React.FC<{
    label: string;
    // isSelected: boolean;
    onClick: (isSelected: boolean) => void;
}> = ({ label, onClick }) => {

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        onClick(!isSelected);
    }

    return (
        <button
            onClick={handleClick}
            className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group hover:bg-blue-300 dark:hover:bg-gray-700 ${isSelected ? 'bg-blue-500 dark:bg-gray-700 text-white' : ''}`}
        >
            {label}
        </button>
    );
};

const PivotProfessorSelector: React.FC<PivotProps> = ({ subject, onClick, professors }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <li className="">
            <button
                aria-controls="dropdown-example"
                onClick={() => setIsVisible(!isVisible)}
                className="bg-gray-900 flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                <span className="flex-1 ms-3 text-left rtl:text-right">
                    {subject.name}
                </span>
                <DropdownIcon />
            </button>

            <ul className={`${isVisible ? "block" : "hidden"} py-2 space-y-2`}>
                {subject.professors.map((professor) => (
                    <ValueCell
                        key={professor}
                        label={professors.find(p => p.id === professor)?.fullName ?? 'Not found'}
                        // isSelected={false}
                        onClick={() => onClick(professor, subject.id, false)}
                    />
                ))}
            </ul>
        </li>
    );
};

export default PivotProfessorSelector;
