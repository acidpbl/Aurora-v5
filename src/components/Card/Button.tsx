import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
}

export function CardButton({ icon: Icon, ...props }: CardButtonProps) {
  return (
    <button
      className="text-primary rounded-lg p-2 cursor-pointer hover:text-card hover:bg-tertiary ease-linear transition-colors"
      {...props}
    >
      <Icon />
    </button>
  );
}
