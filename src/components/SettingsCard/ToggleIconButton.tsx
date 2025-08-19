import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface ToggleIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggled: boolean;
  icon: { toggle: IconType; toggled: IconType };
}

export function ToggleIconButton({
  toggled = false,
  icon: Icon,
  ...props
}: ToggleIconProps) {
  return (
    <button
      className="p-2 rounded bg-secondary text-text hover:bg-accent hover:text-text-hover ease-linear transition-colors cursor-pointer"
      {...props}
    >
      {toggled ? <Icon.toggled /> : <Icon.toggle />}
    </button>
  );
}
