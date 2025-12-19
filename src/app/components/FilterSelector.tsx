"use client"
import CategorySelector from '@/app/components/CategorySelector';
import Category from '@/domain/entities/Category';
import DegreeCategory from '@/domain/entities/DegreeCategory';
import Pivot from '@/domain/entities/Pivot';
import { Professor } from '@/domain/entities/Professor';
import SubjectCategory from '@/domain/entities/SubjectCategory';
import { ProfessorsCsvDataSource } from '@/infrastructure/datasource/ProfessorsCsvDataSource';
import React, { useEffect, useState } from 'react';


interface FilterSelectorProps {
    categories: Category[]
    onClick: (newCategories: Category[]) => void
    onProfessorSelect?: (pivots: Pivot[]) => void;
    pivots?: Pivot[];
}


const FilterSelector: React.FC<FilterSelectorProps> = ({ categories, onClick, onProfessorSelect, pivots = [] }) => {
    const [allProfessors, setAllProfessors] = useState<Professor[]>([]);
    const [selectedProfessors, setSelectedProfessors] = useState<Map<number, number[]>>(new Map());

    useEffect(() => {
        const loadProfessors = async () => {
            const professorsDataSource = new ProfessorsCsvDataSource();
            const professors = await professorsDataSource.getAll();
            setAllProfessors(professors);
        };
        loadProfessors();
    }, []);

    useEffect(() => {
        // Sincronizar pivots con selectedProfessors
        const newMap = new Map<number, number[]>();
        pivots.forEach(pivot => {
            const existing = newMap.get(pivot.idSubject) || [];
            if (!existing.includes(pivot.idProfessor)) {
                newMap.set(pivot.idSubject, [...existing, pivot.idProfessor]);
            }
        });
        setSelectedProfessors(newMap);
    }, [pivots]);

    const refreshCategories = (categoryIndex: number, valueId: number) => {
        const newCategories = [...categories];
        const category = newCategories[categoryIndex]
        category.onClick(valueId);
        newCategories[categoryIndex] = category;
        categories.forEach((cat) => cat.filterWithCategories(newCategories));
        onClick(newCategories);
    }

    const [isDegreeSelected, setIsDegreeSelected] = useState(false);
    const [degreeTitle, setDegreeTitle] = useState<string>("");

    const handleDegreeClick = (categoryIndex: number, valueId: number) => {
        const degreeCategory = categories[categoryIndex];
        const selectedValue = degreeCategory.values.find(v => v.id === valueId);
        if (selectedValue) {
            setDegreeTitle(selectedValue.label);
        }
        refreshCategories(categoryIndex, valueId);
    };

    const handleProfessorSelect = (subjectId: number, professorId: number) => {
        const newMap = new Map(selectedProfessors);
        const currentProfessors = newMap.get(subjectId) || [];
        
        // Toggle: si ya está seleccionado, lo quitamos del array
        if (currentProfessors.includes(professorId)) {
            const updated = currentProfessors.filter(id => id !== professorId);
            if (updated.length === 0) {
                newMap.delete(subjectId);
            } else {
                newMap.set(subjectId, updated);
            }
        } else {
            // Si no está, lo agregamos al array
            newMap.set(subjectId, [...currentProfessors, professorId]);
        }
        
        setSelectedProfessors(newMap);

        // Convertir a Pivots y notificar al padre
        if (onProfessorSelect) {
            const newPivots: Pivot[] = [];
            newMap.forEach((professorIds, subjectId) => {
                professorIds.forEach(professorId => {
                    newPivots.push({
                        idSubject: subjectId,
                        idProfessor: professorId
                    });
                });
            });
            onProfessorSelect(newPivots);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-1 h-full pb-32">
            <div className='font-bold mb-4 p-1.5'>Selecciona tu Carrera</div>
            <ul className="space-y-2 ">
                {
                    categories.filter(c => c instanceof DegreeCategory).map((category, index) => (
                        <CategorySelector 
                            isDegreeSelected={isDegreeSelected} 
                            setIsDegreeSelected={setIsDegreeSelected} 
                            key={index} 
                            category={category} 
                            onClick={(valueId) => handleDegreeClick(index, valueId)}
                            isDegreeCategory={true}
                            degreeTitle={degreeTitle}
                        />
                    ))
                }
            </ul>
            <div className='font-bold my-4 p-1.5'>Selecciona tus Materias</div>

            {isDegreeSelected ? <ul className="space-y-2 ">
                {
                    categories.filter(c => c instanceof SubjectCategory).map((category, index) => (
                        <CategorySelector 
                            isDegreeSelected={isDegreeSelected} 
                            setIsDegreeSelected={setIsDegreeSelected} 
                            key={index + 1} 
                            category={category} 
                            onClick={(valueId) => refreshCategories(index + 1, valueId)}
                            allProfessors={allProfessors}
                            onProfessorSelect={handleProfessorSelect}
                            selectedProfessors={selectedProfessors}
                        />
                    ))
                }
            </ul> : <span className='text-gray-500'>
                Selecciona tu Plan de Estudios primero
            </span>}

        </div>
    )
}

export default FilterSelector