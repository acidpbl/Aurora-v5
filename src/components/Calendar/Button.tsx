import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface CalendarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
}

export function CalendarButton({ icon: Icon, ...props }: CalendarButtonProps) {
  return (
    <button
      className="text-primary rounded-lg p-2 cursor-pointer hover:text-card hover:bg-tertiary ease-linear transition-colors"
      {...props}
    >
      <Icon />
    </button>
  );
}
