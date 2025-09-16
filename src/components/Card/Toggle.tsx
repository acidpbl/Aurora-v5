import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface CardToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: { toggle: IconType; toggled: IconType };
  label?: { toggle: string; toggled: string };
  toggled: boolean;
}

export function CardToggle({
  icon,
  label,
  toggled,
  ...props
}: CardToggleProps) {
  const Icon = toggled ? icon.toggled : icon.toggle;
  const text = label ? (toggled ? label.toggled : label.toggle) : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        {...props}
        className="p-2 cursor-pointer rounded-lg border-2 border-tertiary text-text-primary bg-background aspect-square size-fit hover:bg-primary hover:text-background hover:border-secondary ease-linear transition-colors peer"
      >
        <Icon size={32} />
      </button>
      {text && (
        <span className="text-text-primary text-xs peer-hover:text-secondary ease-linear transition-colors">
          {text}
        </span>
      )}
    </div>
  );
}
