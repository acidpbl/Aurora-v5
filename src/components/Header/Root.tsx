import type { ReactNode } from "react";

interface HeaderRootProps {
  children?: ReactNode;
}

export function HeaderRoot({ children }: HeaderRootProps) {
  return (
    <header className="w-full h-16 rounded-lg bg-card border-2 border-tertiary flex items-center p-4 justify-between ease-linear transition-colors">
      <div className="font-jetbrains text-text-primary ease-linear transition-colors">
        settings
      </div>
      <div className="flex gap-2">{children}</div>
    </header>
  );
}
