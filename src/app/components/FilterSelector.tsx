"use client"
import Category from '@/domain/entities/Category'
import React, { useState } from 'react'
import CategorySelector from '@/app/components/CategorySelector';
import SliderFilter from './SliderBar';
import DegreeCategory from '@/domain/entities/DegreeCategory';
import SubjectCategory from '@/domain/entities/SubjectCategory';

interface FilterSelectorProps {
    categories: Category[]
    onClick: (newCategories: Category[]) => void
    onSubmit: () => void
    onChanceSliderValue: (value: number | number[]) => void;
    maxSliderValue: number;
    toggleSideBar: () => void;
}


const FilterSelector: React.FC<FilterSelectorProps> = ({ categories, onClick, onSubmit, onChanceSliderValue, maxSliderValue, toggleSideBar }) => {
    const refreshCategories = (categoryIndex: number, valueId: number) => {
        const newCategories = [...categories];
        const category = newCategories[categoryIndex]
        category.onClick(valueId);
        newCategories[categoryIndex] = category;
        categories.forEach((cat) => cat.filterWithCategories(newCategories));
        onClick(newCategories);
    }

    const [isDegreeSelected, setIsDegreeSelected] = useState(false);

    return (
        <>
            <div className="h-4/6 overflow-y-auto p-1 ">
                <div className='font-bold mb-4 p-1.5'>Selecciona tu Carrera</div>
                <ul className="space-y-2 ">
                    {
                        categories.filter(c => c instanceof DegreeCategory).map((category, index) => (
                            <CategorySelector isDegreeSelected={isDegreeSelected} setIsDegreeSelected={setIsDegreeSelected} key={index} category={category} onClick={(valueId) => refreshCategories(index, valueId)} />
                        ))
                    }
                </ul>
                <div className='font-bold my-4 p-1.5'>Selecciona tus Materias</div>

                {isDegreeSelected ? <ul className="space-y-2 ">
                    {
                        categories.filter(c => c instanceof SubjectCategory).map((category, index) => (
                            <CategorySelector isDegreeSelected={isDegreeSelected} setIsDegreeSelected={setIsDegreeSelected} key={index + 1} category={category} onClick={(valueId) => refreshCategories(index + 1, valueId)} />
                        ))
                    }
                </ul> : <span className='text-gray-500'>
                    Selecciona tu Plan de Estudios primero
                </span>}

            </div>
            <div className='px-5'>
                <SliderFilter maxValue={maxSliderValue} label='Materias por horario' objectNameCounting='materias' onValueChange={onChanceSliderValue} />
            </div>
            <button onClick={() => { onSubmit(); toggleSideBar(); }} className="justify-self-center block mt-5 py-2 px-10 bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                Generar Horarios
            </button>
        </>
    )
}

export default FilterSelector