import Category from "./Category";
import CourseFilter from "./CourseFilter";
import { Group } from "./Group";
import GroupFilter from "./GroupFilter";

export default class GroupCategory implements Category {
    title: string;
    values: { label: string; id: number; value: Group; }[];
    private _selectedValues: Map<number, Group> = new Map();
    constructor(title: string, values: Group[]) {
        this.title = title;
        this.values = values.map((value, index) => ({ label: value.toString(), id: index, value: value }));
    }
    filterWithCategories(): void {
    }
    get selectedValues(): Group[] {
        return Array.from(this._selectedValues.values())
    }
    toCourseFilter(): CourseFilter {
        return new GroupFilter(this.selectedValues);
    }
    onClick(id: number): void {
        if (this._selectedValues.has(id)) {
            this._selectedValues.delete(id);
            return;
        }
        const newValue = this.values.find(value => value.id === id);
        if (!newValue) return;
        this._selectedValues.set(id, newValue.value)
    }
    isSelected(id: number): boolean {
        return this._selectedValues.has(id);
    }

}