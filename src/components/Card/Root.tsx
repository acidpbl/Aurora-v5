import type { ReactNode } from "react";
import { useSettings } from "../../context/SettingsProvider";

interface CardRootProps {
  title?: string;
  children?: ReactNode;
}

export function CardRoot({ title, children }: CardRootProps) {
  const { language } = useSettings();

  return (
    <div className="w-full aspect-square bg-card border-2 border-tertiary box-border flex flex-col rounded-lg overflow-hidden p-2 ease-linear transition-colors">
      <div className="w-full flex justify-center items-center min-h-8 text-text-primary font-jetbrains ease-linear transition-colors">
        {title ? title : language === "en-us" ? "card" : "cartão"}
      </div>
      <div className="w-full h-full flex flex-col p-2">{children}</div>
    </div>
  );
}
