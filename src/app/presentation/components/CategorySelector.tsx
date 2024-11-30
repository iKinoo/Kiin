import Category from '@/app/domain/models/Category';
import React, { useState } from 'react'
interface CategoryProps {
    category: Category;
    color: string;
}

const CategorySelector: React.FC<CategoryProps> = ({ category, color }) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div style={{ marginBottom: "1rem", border: `1px solid ${color}`, borderRadius: "4px" }}>
            <button
                onClick={() => setIsVisible(!isVisible)}
                style={{
                    backgroundColor: color,
                    color: "#fff",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {category.getTitle()}
            </button>
            {isVisible && (
                <ul style={{ listStyle: "none", padding: "0.5rem 1rem", margin: 0, backgroundColor: "#f9f9f9" }}>
                    {category.getValues().map((value, index) => (
                        <li key={index} style={{ padding: "0.25rem 0", borderBottom: "1px solid #e0e0e0" }}>
                            {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategorySelector