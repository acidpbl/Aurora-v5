import type { InputHTMLAttributes } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

interface WeatherInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export function WeatherInput({ placeholder, ...props }: WeatherInputProps) {
  return (
    <div className="w-full flex bg-background rounded-lg overflow-hidden border-2 border-tertiary focus-within:border-primary ease-linear transition-colors">
      <input
        type="text"
        className="w-full outline-0 h-10 p-2 text-text-primary pt-1"
        placeholder={placeholder}
        {...props}
      />
      <button className="aspect-square cursor-pointer h-full flex items-center justify-center bg-primary rounded-l-lg text-background hover:bg-primary-hover hover:text-text-primary ease-linear transition-colors" type="submit">
        <PiMagnifyingGlassBold />
      </button>
    </div>
  );
}
