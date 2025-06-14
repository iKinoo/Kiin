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
                    <div className='ms-4  text-gray-500'>
                        <svg className='inline-block' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-240q-33 0-56.5-23.5T320-320v-50q-57-39-88.5-100T200-600q0-117 81.5-198.5T480-880q117 0 198.5 81.5T760-600q0 69-31.5 129.5T640-370v50q0 33-23.5 56.5T560-240H400Zm0-80h160v-92l34-24q41-28 63.5-71.5T680-600q0-83-58.5-141.5T480-800q-83 0-141.5 58.5T280-600q0 49 22.5 92.5T366-436l34 24v92Zm0 240q-17 0-28.5-11.5T360-120v-40h240v40q0 17-11.5 28.5T560-80H400Zm80-520Z"/></svg>
                        Puede que haya conflictos, usa esto para encontrar combinaciones sin conflictos</div>
                    <li className='p-3'>
                        <SliderFilter maxValue={maxSliderValue} label='Materias por horario' objectNameCounting='materias' onValueChange={onChanceSliderValue} />
                    </li>

                </ul>
            </div>
            <button onClick={() => { onSubmit(); toggleSideBar(); }} className="justify-self-center block mt-12 py-2 px-10 bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                Aplicar
            </button>
        </>
    )
}

export default FilterSelector