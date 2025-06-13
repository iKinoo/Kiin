import { useState } from "react";
import { Slider } from "@heroui/slider";

interface SliderFilterProps {
  label: string;
  maxValue: number;
  getValue?: (value: number) => string;
  size?: "sm" | "md" | "lg";
  className?: string;
  objectNameCounting: string;
  onValueChange: (value: number | number[]) => void;
}

export function SliderFilter({
  maxValue,
  label,
  objectNameCounting,
  onValueChange,
}: SliderFilterProps) {
  const [selectedValue, setSelectedValue] = useState<number>(maxValue);

  // // Solo actualiza el valor por defecto cuando maxValue cambia
  // useEffect(() => {
  //   setSelectedValue(maxValue);
  //   onValueChange(maxValue);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [maxValue]);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedValue(value as number);
    onValueChange(value);
  };

  return (
    <Slider
      isDisabled={maxValue === 0}
      className="max-w-md text-black dark:text-white"
      getValue={(value) => {
        const numValue = typeof value === "number" ? value : Array.isArray(value) ? value[0] : 0;
        return `${numValue > 0 ? `${numValue} de ${maxValue} ${objectNameCounting}` : "Todas las posibles combinaciones"}`;
      }}
      label={label}
      maxValue={maxValue}
      size="sm"
      value={selectedValue}
      onChange={handleSliderChange}
    />
  );
}

export default SliderFilter;
