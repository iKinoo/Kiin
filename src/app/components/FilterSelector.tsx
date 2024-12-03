"use client"
import Category from '@/domain/entities/Category'
import React, { useEffect } from 'react'
import CategorySelector from '@/app/components/CategorySelector';

const FilterSelector = () => {
    const [categories, setCategories] = React.useState<Category[]>([]);

    useEffect(() => {
        const newCategories = [
            new Category('Licenciatura', ['LIS', 'LIC', 'LCC']),
            new Category('Semestre', ['1', '2', '3']),
        ]
        setCategories(newCategories)
    }, [])
    return (
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        <span className="ms-3">Aplica filtros para organizar</span>
                    </a>
                </li>
                {
                    categories.map((category, index) => (
                        <CategorySelector key={index} category={category} />
                    ))
                }
                <li>
                    <button className="justify-self-center block mt-12 py-2 px-10 bg-purple-500 hover:bg-purple-800 text-white font-bold rounded">
                        Aplicar
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default FilterSelector