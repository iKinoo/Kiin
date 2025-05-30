import { useEffect, useState } from "react";
import { Slider } from "@nextui-org/react";

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

  // Solo actualiza el valor por defecto cuando maxValue cambia
  useEffect(() => {
    setSelectedValue(maxValue);
    onValueChange(maxValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValue]);

  const handleSliderChange = (value: number | number[]) => {
    setSelectedValue(value as number);
    onValueChange(value);
  };

  return (
    <Slider
      className="max-w-md text-black dark:text-white"
      getValue={(value) => `${value} of ${maxValue} ${objectNameCounting}`}
      label={label}
      maxValue={maxValue}
      size="sm"
      value={selectedValue}
      onChange={handleSliderChange}
    />
  );
}

export default SliderFilter;
