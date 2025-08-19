import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiArrowClockwiseFill,
  PiArrowClockwiseBold,
} from "react-icons/pi";
import { useDate } from "../../hooks/useDate";
import { Card } from "../Card";
import { twMerge } from "tailwind-merge";

interface CalendarMonthHeaderProps {
  monthName: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  reset: () => void;
}

export function CalendarMonthHeader({
  monthName,
  year,
  onPrev,
  onNext,
  reset,
}: CalendarMonthHeaderProps) {
  const { now } = useDate();

  const isCurrentMonth =
    now.getMonth() === new Date(`${monthName} 1, ${year}`).getMonth() &&
    now.getFullYear() === year;

  return (
    <div className="w-full flex justify-between">
      <Card.Button
        onClick={onPrev}
        aria-label="Previous month"
        icon={PiCaretLeftBold}
      />
      <div className="flex gap-2 items-center">
        <span
          className={twMerge(
            "font-jetbrains text-lg",
            isCurrentMonth ? "text-accent" : "text-text"
          )}
        >
          {monthName} {year}
        </span>
        <span className="font-jetbrains text-accent text-sm">
          {isCurrentMonth ? "(Today)" : ""}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Card.Button
          onClick={reset}
          aria-label="Actual Month"
          icon={isCurrentMonth ? PiArrowClockwiseFill : PiArrowClockwiseBold}
        />
        <Card.Button
          onClick={onNext}
          aria-label="Previous month"
          icon={PiCaretRightBold}
        />
      </div>
    </div>
  );
}
