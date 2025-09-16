import type { ReactNode } from "react";
import { useSettings } from "../../context/SettingsProvider";

interface FooterRootProps {
  children?: ReactNode;
}
export function FooterRoot({ children }: FooterRootProps) {
  const { language } = useSettings();
  return (
    <footer className="w-full h-48 rounded-lg bg-card border-2 border-tertiary flex flex-col items-center p-4 justify-between ease-linear transition-colors lowercase">
      <div className="font-jetbrains text-text-primary ease-linear transition-colors min-h-8">
        {language === "en-us" ? "footer" : "rodapé"}
      </div>
      <div className="flex gap-2">{children}</div>
    </footer>
  );
}
