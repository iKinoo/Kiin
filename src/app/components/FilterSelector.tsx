"use client"
import Category from '@/domain/entities/Category'
import React from 'react'
import CategorySelector from '@/app/components/CategorySelector';
import SliderFilter from './SliderBar';

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

    return (
        <>
            <div className="h-4/6 overflow-y-auto p-1 ">
                <ul className="space-y-2 ">

                    {
                        categories.map((category, index) => (
                            <CategorySelector key={index} category={category} onClick={(valueId) => refreshCategories(index, valueId)} />
                        ))

                    }
                    
                    

                </ul>
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