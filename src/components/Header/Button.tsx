import type { ButtonHTMLAttributes } from "react";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

export function HeaderButton({
  placeholder = "",
  ...props
}: HeaderButtonProps) {
  return (
    <button
      className="p-4 h-8 min-w-8 cursor-pointer rounded-lg border-2 border-tertiary hover:bg-background ease-linear transition-colors"
      {...props}
    >
      {placeholder}
    </button>
  );
}
