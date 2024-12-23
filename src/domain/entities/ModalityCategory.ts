import Category from "@/domain/entities/Category";
import CourseFilter from "@/domain/entities/CourseFilter";
import { Modalities } from "@/domain/entities/Modalities";
import ModalityFilter from "@/domain/entities/ModalityFilter";

export class ModalityCategory implements Category {
    title: string;
    values: { label: string; id: number; value: Modalities; }[];
    private _selectedValues: Map<number, Modalities> = new Map();

    constructor(title: string, values: Modalities[]) {
        this.title = title;
        this.values = values.map((value, index) => ({ label: value, id: index, value: value }));
    }

    filterWithCategories(): void {
    }

    get selectedValues(): Modalities[] {
        return Array.from(this._selectedValues.values())
    }
    toCourseFilter(): CourseFilter {
        return new ModalityFilter(this.selectedValues);
    }
    onClick(id: number): void {
        const selectedValue = this._selectedValues.get(id);
        const isSelected = selectedValue !== undefined;
        if (isSelected) {
            this._selectedValues.delete(id);
            return;
        }
        const newValue = this.values.find(value => value.id === id);
        if (!newValue) return;
        this._selectedValues.set(id, newValue.value);
    }
    isSelected(id: number): boolean {
        return this._selectedValues.has(id);
        
    }

}