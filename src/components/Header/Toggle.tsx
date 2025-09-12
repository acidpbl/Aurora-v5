import type { ButtonHTMLAttributes } from "react";

interface HeaderToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggled: boolean;
  options: { toggle: string; toggled: string };
}

export function HeaderToggle({
  options,
  toggled,
  ...props
}: HeaderToggleProps) {
  return (
    <button
      className="p-2 cursor-pointer rounded-lg border-2 border-tertiary hover:bg-background ease-linear transition-colors flex items-center"
      {...props}
    >
      <span className="text-secondary text-xs">
        {toggled ? options.toggled : options.toggle}
      </span>
    </button>
  );
}
