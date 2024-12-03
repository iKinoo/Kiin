import React from "react";
import FilterSelector from "../components/FilterSelector";
import SideBar from '../components/SideBar'
import Calendar from "../components/Calendar";

const CalendarPage = () => {
  return (
    <div
      className="bg-white text-black"
      style={{
        display: "flex",
        justifyContent: "first baseline",
        alignItems: "first baseline",
        gap: "20px",
        padding: "10px",
      }}
    >
      <SideBar />
      <FilterSelector />
      <Calendar />
    </div>
  );
};

export default CalendarPage;
