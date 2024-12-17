import Category from "@/domain/entities/Category";

export default interface CategoryFilter {
    satisfy(category: Category): boolean;
}