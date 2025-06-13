"use client"
import Category from '@/domain/entities/Category'
import React, { useState } from 'react'
import CategorySelector from '@/app/components/CategorySelector';
import DegreeCategory from '@/domain/entities/DegreeCategory';
import SubjectCategory from '@/domain/entities/SubjectCategory';
import { Spinner } from "@heroui/spinner";


interface FilterSelectorProps {
    categories: Category[]
    onClick: (newCategories: Category[]) => void
    onSubmit: () => void
    toggleSideBar: () => void;
    isLoadingGeneration: boolean;
}


const FilterSelector: React.FC<FilterSelectorProps> = ({ categories, onClick, onSubmit, toggleSideBar, isLoadingGeneration}) => {
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
            <button onClick={() => { onSubmit(); toggleSideBar(); }} className="grid grid-cols-3  mt-5 items-center  bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                {isLoadingGeneration ? <div className='flex col-start-1  w-max  justify-self-center self-center'>
                    <Spinner size='md' color='default' classNames={{ label: "text-foreground",  } } variant="simple" />
                </div> : ""}
                
                <div className='col-start-2 justify-center text-center'>{isLoadingGeneration ? "Generando Horarios" : "Generar Horarios"}</div>
            </button>
        </>
    )
}

export default FilterSelector