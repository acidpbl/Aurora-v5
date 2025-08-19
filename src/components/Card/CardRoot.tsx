import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardRootProps {
  title: string;
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  align?: "start" | "center" | "end";
}

export function CardRoot({
  title,
  children,
  colSpan = 1,
  rowSpan = 1,
  align = "start",
}: CardRootProps) {
  const colClass = `col-span-${colSpan}`;
  const rowClass = `row-span-${rowSpan}`;

  const cardAlign = `items-${align}`;

  return (
    <div
      className={twMerge(
        "pt-4 px-8 pb-8 rounded-md flex flex-col items-center gap-2 w-full h-full shadow",
        colClass,
        rowClass,
        "bg-card"
      )}
    >
      <h1 className="min-h-6 max-h-6 font-poppins capitalize text-text font-medium">
        {title}
      </h1>
      <div className={twMerge("size-full flex", cardAlign)}>{children}</div>
    </div>
  );
}
