import { twMerge } from "tailwind-merge";
import { useCalendar } from "../../context/CalendarProvider";
import { useDate } from "../../hooks/useDate";
import { Card } from "../Card";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiClockClockwiseBold,
  PiCircleFill,
} from "react-icons/pi";
import { useSettings } from "../../context/SettingsProvider";

export function CalendarHeader() {
  const { states, functions } = useCalendar();
  const { now } = useDate().states;
  const { language } = useSettings();
  return (
    <header className="w-full flex justify-center px-6">
      <div className="flex w-full rounded-lg bg-background justify-between items-center p-2 border-2 border-tertiary ease-linear transition-colors">
        <div className="">
          <Card.Button
            icon={PiCaretLeftBold}
            onClick={() => {
              if (states.month === 0) {
                functions.setMonth(11);
                functions.setYear(states.year - 1);
              } else {
                functions.setMonth(states.month - 1);
              }
            }}
          />
        </div>
        <span
          className={twMerge(
            states.month === now.getMonth() && states.year === now.getFullYear()
              ? "text-primary"
              : "text-text-primary",
            "font-jetbrains text-lg flex gap-4"
          )}
        >
          {states.month === now.getMonth() &&
            states.year === now.getFullYear() && (
              <PiCircleFill
                className="self-center text-text-primary"
                size={12}
              />
            )}
          {language === "en_us"
            ? `${states.monthStr}, ${states.year}`
            : `${states.monthStr} de ${states.year}`}
        </span>
        <div className="flex gap-2">
          <Card.Button
            icon={PiClockClockwiseBold}
            onClick={() => {
              functions.setMonth(now.getMonth());
              functions.setYear(now.getFullYear());
            }}
          />
          <Card.Button
            icon={PiCaretRightBold}
            onClick={() => {
              if (states.month === 11) {
                functions.setMonth(0);
                functions.setYear(states.year + 1);
              } else {
                functions.setMonth(states.month + 1);
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
