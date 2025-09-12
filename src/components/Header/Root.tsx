import type { ReactNode } from "react";
import { useSettings } from "../../context/SettingsProvider";

interface HeaderRootProps {
  children?: ReactNode;
}

export function HeaderRoot({ children }: HeaderRootProps) {
  const { language } = useSettings();
  return (
    <header className="w-full h-16 rounded-lg bg-card border-2 border-tertiary flex items-center p-4 justify-between ease-linear transition-colors">
      <div className="font-jetbrains text-text-primary ease-linear transition-colors">
        {language === "en-us" ? "settings" : "configurações"}
      </div>
      <div className="flex gap-2">{children}</div>
    </header>
  );
}
