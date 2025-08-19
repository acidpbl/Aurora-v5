import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  placeholder?: string;
}

export function CardButton({ icon: Icon, ...props }: CardButtonProps) {
  return (
    <button
      className="p-2 bg-accent text-text hover:bg-accent-hover hover:text-text-hover ease-linear transition-colors rounded cursor-pointer"
      {...props}
    >
      {props.placeholder && (
        <span className="text-xs text-text">{props.placeholder}</span>
      )}
      {Icon && <Icon />}
    </button>
  );
}
