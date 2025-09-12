import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface HeaderToggleIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggled: boolean;
  icon: { toggle: IconType; toggled: IconType };
}

export function HeaderToggleIcon({
  icon: Icon,
  toggled,
  ...props
}: HeaderToggleIconProps) {
  return (
    <button
      className="p-2 cursor-pointer rounded-lg border-2 border-tertiary hover:bg-background ease-linear transition-colors flex items-center"
      {...props}
    >
      <span className="text-secondary">
        {toggled ? <Icon.toggled /> : <Icon.toggle />}
      </span>
    </button>
  );
}
