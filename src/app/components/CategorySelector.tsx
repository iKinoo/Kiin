import Category from "@/domain/entities/Category";
import React, { useState } from "react";

interface CategoryProps {
    category: Category;
    onClick: (valueId: number) => void;
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
}> = ({ label, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group hover:bg-blue-300 dark:hover:bg-gray-700 ${isSelected ? 'bg-blue-500 dark:bg-gray-700 text-white' : ''}`}
        >
            {label}
        </button>
    );
};

const CategorySelector: React.FC<CategoryProps> = ({ category, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <li className="">
            <button
                aria-controls="dropdown-example"
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap sticky top-0">
                    {category.title}
                </span>
                <DropdownIcon />
            </button>

            <ul className={`${isVisible ? "block" : "hidden"} py-2 space-y-2 `}>
                {category.values.map((value) => (
                    <ValueCell
                        key={value.id}
                        label={value.label}
                        isSelected={category.isSelected(value.id)}
                        onClick={() => onClick(value.id)}
                    />
                ))}
            </ul>
        </li>
    );
};

export default CategorySelector;
