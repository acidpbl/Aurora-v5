import { useEffect, useRef, useState } from "react";

interface Option {
  label?: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function SelectMenu({ options, value, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-fit font-jetbrains" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full p-2 rounded bg-secondary text-text hover:bg-accent hover:text-text-hover transition-colors cursor-pointer"
      >
        <span className="flex items-center justify-center gap-2 text-xs">
          {selected?.icon}
          {selected?.label}
        </span>
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-secondary rounded shadow z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left p-2 hover:bg-accent hover:text-text-hover transition-colors rounded cursor-pointer text-xs"
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
