// import CategoryFilter from "@/domain/entities/CategoryFilter";
import CourseFilter from "@/domain/entities/CourseFilter";

interface Category {
    title: string; // title of the category
    values: {label: string, id: number,value: unknown}[]; // values v of the category
    
    filterWithCategories(categories: Category[]): void;
    get selectedValues(): unknown[];
    toCourseFilter(): CourseFilter
    onClick(id: number): void;
}

export default Category;