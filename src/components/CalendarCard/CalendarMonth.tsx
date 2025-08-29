import { useSettings } from "../../context/SettingsContext";
import { useState } from "react";
import { CalendarMonthHeader } from "./CalendarMonthHeader";
import { CalendarMonthWeekdays } from "./CalendarMonthWeekdays";
import { CalendarMonthGrid } from "./CalendarMonthGrid";
import { PiCaretDown } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

function getMonthMatrix(year: number, month: number, language: string) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(2023, 0, i + 1);
    weekDays.push(d.toLocaleDateString(language, { weekday: "short" }));
  }

  const weekDaysShort = weekDays.map((wd) => wd[0]);

  const matrix: { day: number; type: "prev" | "current" | "next" }[][] = [];
  let day = 1 - firstWeekDay;
  while (day <= daysInMonth) {
    const week: { day: number; type: "prev" | "current" | "next" }[] = [];
    for (let i = 0; i < 7; i++) {
      if (day < 1) {
        week.push({ day: prevMonthLastDay + day, type: "prev" });
      } else if (day > daysInMonth) {
        week.push({ day: day - daysInMonth, type: "next" });
      } else {
        week.push({ day, type: "current" });
      }
      day++;
    }
    matrix.push(week);
  }

  while (matrix.length < 6) {
    const lastWeek = matrix[matrix.length - 1];
    const lastDayObj = lastWeek[lastWeek.length - 1];
    let nextDay = lastDayObj.day + 1;
    const week: { day: number; type: "next" }[] = [];
    for (let i = 0; i < 7; i++) {
      week.push({ day: nextDay++, type: "next" });
    }
    matrix.push(week);
  }

  return { weekDaysShort, matrix };
}

export function CalendarMonth() {
  const { language } = useSettings();
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());

  const { weekDaysShort, matrix } = getMonthMatrix(
    displayYear,
    displayMonth,
    language
  );

  const monthName = new Date(displayYear, displayMonth).toLocaleDateString(
    language,
    { month: "long" }
  );
  const year = displayYear;

  const isToday = (day: number, type: string) =>
    type === "current" &&
    displayMonth === today.getMonth() &&
    displayYear === today.getFullYear() &&
    day === today.getDate();

  const prevMonth = () => {
    setDisplayMonth((m) => {
      if (m === 0) {
        setDisplayYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const resetMonth = () => {
    setDisplayMonth(today.getMonth());
    setDisplayYear(today.getFullYear());
  };

  const nextMonth = () => {
    setDisplayMonth((m) => {
      if (m === 11) {
        setDisplayYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  return (
    <>
      <CalendarMonthHeader
        monthName={monthName}
        monthIndex={displayMonth}
        year={year}
        onPrev={prevMonth}
        onNext={nextMonth}
        reset={resetMonth}
      />
      <div className="w-full flex flex-col gap-1 items-center justify-center font-poppins">
        <CalendarMonthWeekdays
          weekDaysShort={weekDaysShort}
          displayMonth={displayMonth}
          displayYear={displayYear}
        />
        <div className="grid grid-cols-7 w-full rounded overflow-hidden bg-secondary shadow">
          <CalendarMonthGrid matrix={matrix} isToday={isToday} />
        </div>
        <button
          onClick={() => {}}
          className={twMerge(
            "flex items-center gap-2 mt-3 cursor-pointer",
            "text-accent-text hover:text-accent-hover transition-colors ease-linear"
          )}
        >
          show more <PiCaretDown />
        </button>
      </div>
    </>
  );
}
