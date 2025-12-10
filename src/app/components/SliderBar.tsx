import { Slider } from "@heroui/slider";
import { useEffect, useState } from "react";

interface SliderFilterProps {
  label: string;
  maxValue: number;
  defaultValue?: number;
  getValue?: (value: number) => string;
  size?: "sm" | "md" | "lg";
  className?: string;
  objectNameCounting: string;
  onValueChange: (value: number | number[]) => void;
}

export function SliderFilter({
  maxValue,
  defaultValue,
  label,
  objectNameCounting,
  onValueChange,
}: SliderFilterProps) {
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue ?? maxValue);

  // Actualiza el valor cuando defaultValue cambia
  useEffect(() => {
    const newValue = defaultValue ?? maxValue;
    setSelectedValue(newValue);
    onValueChange(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, maxValue]);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedValue(value as number);
    onValueChange(value);
  };

  return (
    <Slider
      isDisabled={maxValue === 0}
      className=" text-black dark:text-white"
      getValue={(value) => {
        const numValue = typeof value === "number" ? value : Array.isArray(value) ? value[0] : 0;
        return `${numValue > 0 ? `${numValue} de ${maxValue} ${objectNameCounting}` : "Todas las posibles combinaciones"}`;
      }}
      label={label}
      maxValue={maxValue}
      size="md"
      value={selectedValue}
      onChange={handleSliderChange}
    />
  );
}

export default SliderFilter;
