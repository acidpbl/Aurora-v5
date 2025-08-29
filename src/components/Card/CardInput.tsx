import type { InputHTMLAttributes } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

interface CardInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  onSearch?: (value: string) => void; // callback for search
}

export function CardInput({ placeholder, onSearch, ...props }: CardInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch && e.currentTarget.value.trim() !== "") {
      onSearch(e.currentTarget.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      onSearch &&
      e.currentTarget.previousElementSibling instanceof HTMLInputElement
    ) {
      const value = e.currentTarget.previousElementSibling.value;
      if (value.trim() !== "") onSearch(value);
    }
  };

  return (
    <div className="w-full h-12 flex items-center border-2 border-transparent rounded focus-within:border-accent overflow-hidden box-border focus-within:shadow font-poppins">
      <input
        className="appearance-none w-full h-full bg-secondary border-none outline-none p-1 pl-2 text-text ease-linear transition-colors"
        {...props}
        placeholder={placeholder || "Search..."}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleClick}
        className="appearance-none h-full p-2 aspect-square flex items-center justify-center bg-accent text-text hover:text-text-hover hover:bg-accent-hover ease-linear transition-colors cursor-pointer"
      >
        <PiMagnifyingGlassBold />
      </button>
    </div>
  );
}
