import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";

interface Option {
  label?: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  options: Option[];
  value: string;
  onchange: (value: string) => void;
}

export function SelectMenu({ options, value, onchange }: SelectProps) {
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
        className="flex aspect-square p-2 border-2 rounded-lg cursor-pointer border-tertiary hover:bg-background ease-linear transition-colors"
      >
        <span className="flex items-center justify-center gap-2 text-xs min-w-4">
          {selected?.icon}
          {selected?.label}
        </span>
      </button>

      {open && (
        <div className="absolute mt-1 w-full z-10 bg-card border-2 border-tertiary rounded-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onchange(opt.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left p-2 hover:bg-background hover:text-text-secondary ease-linear transition-colors cursor-pointer text-xs"
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
