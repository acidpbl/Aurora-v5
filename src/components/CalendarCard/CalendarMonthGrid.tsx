import { twMerge } from "tailwind-merge";

interface CalendarMonthGridProps {
  matrix: { day: number; type: "prev" | "current" | "next" }[][];
  isToday: (day: number, type: string) => boolean;
}

export function CalendarMonthGrid({ matrix, isToday }: CalendarMonthGridProps) {
  const flat = matrix.flat();

  const lastPrevIdx = flat.map((cell) => cell.type).lastIndexOf("prev");
  const firstNextIdx = flat.map((cell) => cell.type).indexOf("next");

  return (
    <>
      {flat.map(({ day, type }, i) => (
        <span
          key={i}
          tabIndex={type === "current" ? 0 : -1}
          className={twMerge(
            "flex items-center justify-center p-2 text-center ease-linear transition-colors",
            type === "current"
              ? isToday(day, type)
                ? "bg-accent text-text hover:bg-accent-hover hover:text-text-hover rounded font-semibold"
                : "bg-secondary text-text hover:bg-secondary-hover hover:text-text-secondary-hover rounded"
              : "bg-tertiary text-text opacity-50 font-extralight",
            i === lastPrevIdx && "rounded-br",
            i === firstNextIdx && "rounded-tl"
          )}
        >
          {day}
        </span>
      ))}
    </>
  );
}
