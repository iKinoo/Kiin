"use client"
import Category from '@/domain/entities/Category'
import React, { useEffect } from 'react'
import CategorySelector from '@/app/presentation/components/CategorySelector';

const FilterSelector = () => {
    //Provisional
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown']

    const [categories, setCategories] = React.useState<Category[]>([]);

    useEffect(() => {
        const newCategories = [
            new Category( 'Licenciatura', ['LIS', 'LIC', 'LCC']),
            new Category('Semestre', ['1', '2', '3']),
        ]
        setCategories(newCategories)
    },[])
    return (

        <div style={{width:'30%'}}>{
            categories.map((category, index) => (
                <CategorySelector key={index} category={category} color={colors[index % colors.length]} />
        ))
        }
        </div>
    )
}

export default FilterSelector