import type { ReactNode } from "react";

interface FooterRootProps {
  children?: ReactNode;
}
export function FooterRoot({ children }: FooterRootProps) {
  return (
    <footer className="w-full h-48 rounded-lg bg-card border-2 border-tertiary flex flex-col items-center p-4 justify-between ease-linear transition-colors">
      <div className="font-jetbrains text-text-primary ease-linear transition-colors min-h-8">
        settings
      </div>
      <div className="flex gap-2">{children}</div>
    </footer>
  );
}
