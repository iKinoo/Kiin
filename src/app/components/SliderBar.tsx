"use client";
import { Slider } from "@nextui-org/react";
// import { useState } from "react";

interface SliderFilterProps {
  label: string; // El texto del label
  maxValue: number; // El valor máximo del slider
  getValue?: (value: number) => string; // La función que devuelve el texto del valor
  size?: "sm" | "md" | "lg"; // Opcional: tamaño del slider
  className?: string; // Opcional: clases CSS
  objectNameCounting: string;
  onValueChange: (value: number | number[]) => void;
}

export function SliderFilter({ maxValue, label, objectNameCounting, onValueChange, }: SliderFilterProps) {
  // const [selectedValue, setSelectedValue] = useState<number | number[]>(0); // Cambia el tipo inicial

  const handleSliderChange = (value: number | number[]) => {
    // setSelectedValue(value);
    onValueChange(value);
    console.log('Valor seleccionado:', value);
  };
  return (
    <>
      <Slider
        isDisabled={maxValue === 0 ? true : false}
        className="max-w-md text-black"
        getValue={(value) => `${value} of ${maxValue} ${objectNameCounting}`}
        label={label}
        maxValue={maxValue}
        size="sm"
        onChange={handleSliderChange}
      />

    </>
  );
}
export default SliderFilter