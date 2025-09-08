import type { ReactNode } from "react";

interface CardRootProps {
  title?: string;
  children?: ReactNode;
}

export function CardRoot({ title = "card", children }: CardRootProps) {
  return (
    <div className="w-full aspect-square bg-card border-2 border-tertiary box-border flex flex-col gap-2 rounded-lg overflow-hidden p-2">
      <div className="w-full flex justify-center items-center h-8 text-text-primary font-jetbrains">
        {title}
      </div>
      <div className="w-full h-full flex flex-col p-2">{children}</div>
    </div>
  );
}
