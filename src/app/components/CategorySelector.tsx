import Category from "@/domain/entities/Category";

import { Professor } from "@/domain/entities/Professor";
import { Subject } from "@/domain/entities/Subject";
import React, { useEffect, useState } from "react";

interface CategoryProps {
    category: Category;
    onClick: (valueId: number) => void;
    isDegreeSelected: boolean
    setIsDegreeSelected: (value: boolean) => void;
    isDegreeCategory?: boolean;
    degreeTitle?: string;
    allProfessors?: Professor[];
    onProfessorSelect?: (subjectId: number, professorId: number) => void;
    selectedProfessors?: Map<number, number[]>;
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
    isSelected: boolean;
    onClick: () => void;
    disabled: boolean;
    subjectType?: string;
    subject?: Subject;
    allProfessors?: Professor[];
    onProfessorSelect?: (subjectId: number, professorId: number) => void;
    selectedProfessorIds?: number[];
}> = ({ label, isSelected, onClick, disabled, subjectType, subject, allProfessors, onProfessorSelect, selectedProfessorIds = [] }) => {
    const [showProfessors, setShowProfessors] = useState(false);
    const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);

    useEffect(() => {
        if (isSelected && subject && allProfessors) {
            // Filtrar profesores que imparten esta materia
            const professors = allProfessors.filter(prof => 
                subject.professors.includes(prof.id)
            );
            setFilteredProfessors(professors);
            setShowProfessors(true);
        } else {
            setShowProfessors(false);
        }
    }, [isSelected, subject, allProfessors]);

    const handleSubjectClick = () => {
        onClick();
        if (!isSelected) {
            setShowProfessors(true);
        }
    };

    const handleProfessorClick = (professorId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (subject && onProfessorSelect) {
            onProfessorSelect(subject.id, professorId);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mx-4">
                <button
                    onClick={handleSubjectClick}
                    disabled={disabled}
                    className={` md:hover:text-white ${disabled ? "text-gray-500 hover:bg-transparent" : "md:hover:bg-gray-700"} overflow-hidden flex-1 flex-col items-center p-2 text-left transition duration-75 rounded-lg group md:hover:bg-blue-300 ${isSelected ? 'dark:hover:bg-black bg-black text-white' : ''}`}
                >
                    <div className={`${subjectType === "Obligatoria" ? "text-blue-500" : "text-green-500"} text-start`}> {subjectType}</div>
                    {label}
                </button>
                
                {/* Botón de eliminar materia */}
                {isSelected && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                        className="p-2 rounded-full hover:bg-red-600 bg-red-500 text-white transition-colors"
                        title="Eliminar materia"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                )}
            </div>
            
            {/* Dropdown de profesores */}
            {isSelected && showProfessors && filteredProfessors.length > 0 && (
                <div className="mx-4 mt-1 mb-2 p-2 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">Profesores disponibles:</div>
                    <div className="flex flex-col gap-1">
                        {filteredProfessors.map(professor => (
                            <button
                                key={professor.id}
                                onClick={(e) => handleProfessorClick(professor.id, e)}
                                className={`p-2 text-sm rounded transition-colors ${
                                    selectedProfessorIds.includes(professor.id)
                                        ? 'bg-purple-600 text-white' 
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            >
                                {professor.fullName}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const CategorySelector: React.FC<CategoryProps> = ({ 
    category, 
    onClick, 
    setIsDegreeSelected, 
    isDegreeCategory = false, 
    degreeTitle,
    allProfessors,
    onProfessorSelect,
    selectedProfessors
}) => {
    const [isVisible, setIsVisible] = useState(false);
    

    return (
        <li className="border-1 rounded-lg border-gray-500">
            <button
                aria-controls="dropdown-example"
                onClick={() => setIsVisible(!isVisible)}
                className={`bg-gray-300 dark:border-none border-b border-gray-500  dark:bg-gray-900  sticky top-0 flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group md:hover:bg-gray-100 dark:text-white md:dark:hover:bg-gray-700  `}
            >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    {isDegreeCategory && degreeTitle ? degreeTitle : category.title}
                </span>
                <DropdownIcon />
            </button>

            <ul className={`${isVisible ? "block" : "hidden"} py-2 space-y-2 `}>
                {category.values.map((value) => (
                    <ValueCell
                        key={value.id}
                        label={value.label}
                        subjectType={(value.value as Subject).type}
                        subject={value.value as Subject}
                        isSelected={category.isSelected(value.id)}
                        onClick={() => {
                            onClick(value.id)
                            if (isDegreeCategory) {
                                setIsVisible(false);
                            }
                            setIsDegreeSelected(true)
                        }}
                        disabled={false}
                        allProfessors={allProfessors}
                        onProfessorSelect={onProfessorSelect}
                        selectedProfessorIds={selectedProfessors?.get(value.id) || []}
                    />
                ))}
            </ul>
        </li>
    );
};

export default CategorySelector;
