import { twMerge } from "tailwind-merge";
import { useDate } from "../../hooks/useDate";

interface CalendarMonthWeekdaysProps {
  weekDaysShort: string[];
  displayMonth: number;
  displayYear: number;
}

export function CalendarMonthWeekdays({
  weekDaysShort,
  displayMonth,
  displayYear,
}: CalendarMonthWeekdaysProps) {
  const { now } = useDate();
  const isCurrentMonth =
    displayMonth === now.getMonth() && displayYear === now.getFullYear();

  return (
    <div className="w-full grid grid-cols-7 gap-1 bg-tertiary rounded">
      {weekDaysShort.map((wd, i) => (
        <span
          key={i}
          className={twMerge(
            "text-center font-bold text-xs p-2 justify-center",
            isCurrentMonth && i === now.getDay() ? "text-accent" : "text-text"
          )}
        >
          {wd}
        </span>
      ))}
    </div>
  );
}
