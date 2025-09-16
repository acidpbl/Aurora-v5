import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  label?: string;
}

export function CardButton({ icon: Icon, label, ...props }: CardButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        {...props}
        className="p-2 cursor-pointer rounded-lg border-2 border-tertiary text-text-primary bg-background aspect-square size-fit hover:bg-primary hover:text-background hover:border-secondary ease-linear transition-colors peer"
      >
        {<Icon size={32} />}
      </button>
      {label && (
        <span className="text-text-primary text-xs peer-hover:text-secondary ease-linear transition-colors">
          {label}
        </span>
      )}
    </div>
  );
}
