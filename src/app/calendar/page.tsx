import React from "react";
import FilterSelector from "../components/FilterSelector";
import SideBar from '../components/SideBar'
import Calendar from "../components/Calendar";
import TemporaryForm from "../components/TemporaryForm";

const CalendarPage = () => {
    return (
        <div
            className="bg-white text-black h-full flex flex-row"
        >
            <SideBar>
                <FilterSelector />
            </SideBar>
            <div className="w-5/6 p-5 h-full">
                <TemporaryForm />
                <Calendar />

            </div>
        </div>
    );
};

export default CalendarPage;
