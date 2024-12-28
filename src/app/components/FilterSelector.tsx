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
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">

                {
                    categories.map((category, index) => (
                        <CategorySelector key={index} category={category} onClick={(valueId) => refreshCategories(index, valueId)} />
                    ))

                }
                <li>
                    <SliderFilter maxValue={maxSliderValue} label='Materias por horario' objectNameCounting='materias' onValueChange={onChanceSliderValue} />
                </li>

                <li>
                    <button onClick={() => { onSubmit(); toggleSideBar(); }} className="justify-self-center block mt-12 py-2 px-10 bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                        Aplicar
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default FilterSelector