import Category from '@/domain/entities/Category';
import React, { useState } from 'react'

/**
 * Definicion de la seleccion de filtros y sus componentes
 */

/**
 * Propiedades de categoría
 */
interface CategoryProps {
    category: Category;
    onClick: (category: Category, value: string) => void;
}

/**
 * @returns Icono de despliegue de filtros especificos
 */
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
    )
}

<<<<<<< HEAD
/**
 * Composicion y comportamiento de la seleccion de filtros por categoría
 * @param category categoría del filtro
 * @returns componente de seleccion de filtros en base a una categoria
 */
const CategorySelector: React.FC<CategoryProps> = ({ category }) => {
    const [isVisible, setIsVisible] = useState(false);
=======
const ValueCell:React.FC<{value: string; onClick: () => void;}> = ({ value, onClick }) => {
    const [isSelected, setIsSelected] = useState(false);
>>>>>>> dev

    return (
        <button
            onClick={() => { onClick(); setIsSelected(!isSelected);}}
            className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isSelected ? 'bg-gray dark:bg-gray-700' : ''}`}
        >
            {value}
        </button>
    )
}

const CategorySelector: React.FC<CategoryProps> = ({ category, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <li>
            <button
                aria-controls="dropdown-example"
                onClick={() => { setIsVisible(!isVisible); }}
                className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
            >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    {category.title}
                </span>
                <DropdownIcon />
            </button>

            <ul
                    className={`${isVisible ? 'block' : 'hidden'} py-2 space-y-2`}
                >
                    {category.values.map((value, index) => (
                        <ValueCell key={index} value={value} onClick={() => onClick(category, value)} />
                    ))}
                </ul>
        </li>
    );
};

export default CategorySelector