import CategoryFilter from "@/domain/entities/CategoryFilter";
import CourseFilter from "@/domain/entities/CourseFilter";

interface Category {
    title: string;
    values: {label: string, id: number,value: unknown}[];
    
    filterWith(filters: CategoryFilter[]): void;
    get selectedValues(): unknown[];
    toCourseFilter(): CourseFilter
    onClick(id: number): void;
}

export default Category;