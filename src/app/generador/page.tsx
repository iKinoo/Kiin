"use client";

import { useState } from "react";
import SchedulesView from "./SchedulesView";
import SubjectsView from "./SubjectsView";


const GeneratorPage = () => {
  const [indexSelected, setIndexSelected] = useState(0);

  const handleSwitchView = (index: number) => {
    console.log(index);
    setIndexSelected(index);
  }


  const views = [
    <SubjectsView key={0} />,
    <SchedulesView key={1} />
  ]

  return <div className="flex flex-1 flex-col border-large overflow-auto border-green-500">
    <div className="flex flex-col flex-1 overflow-auto border-large border-purple-500">
      {views[indexSelected]}
    </div>
    <div className="rounded-large p-2 gap-3 flex flex-row justify-center z-40 bg-gray-800 fixed bottom-1 self-center w-[90%]">

      <ButtonSwitchView index={0} isSelected={0 == indexSelected} label={"Materias"} onClick={handleSwitchView} />
      <ButtonSwitchView index={1} isSelected={1 == indexSelected} label={"Horarios"} onClick={handleSwitchView} />
    </div>
  </div>
};
export default GeneratorPage;



interface ButtonSwitchViewProps {
  label: string;
  isSelected: boolean;
  onClick: (index: number) => void;
  index: number;
}

const ButtonSwitchView = ({ isSelected, label, onClick, index }: ButtonSwitchViewProps) => {

  return (
    <button
      onClick={() => {
        onClick(index)
      }}
      className={`rounded-lg p-2 border-2 border-gray-500 ${isSelected ? "bg-gray-500" : ""}`}>
      {label}
    </button>
  )
}
