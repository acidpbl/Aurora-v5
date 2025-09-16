/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { useDate } from "../hooks/useDate";
import { useSettings } from "../context/SettingsProvider";

interface CalendarCell {
  date: Date;
  type: "prev" | "current" | "next";
}

interface CalendarContextType {
  states: {
    weekDays: string[];
    matrix: CalendarCell[][];
    month: number;
    monthStr: string;
    year: number;
  };
  functions: {
    setMonth: React.Dispatch<React.SetStateAction<number>>;
    setYear: React.Dispatch<React.SetStateAction<number>>;
  };
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const { year: Year, month: Month } = useDate().states;
  const { language } = useSettings();

  const [month, setMonth] = useState(Month);
  const [year, setYear] = useState(Year);

  const value: CalendarContextType = useMemo(() => {
    const monthStr = new Date(year, month).toLocaleDateString(language, {
      month: "long",
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstWeekday = firstDayOfMonth.getDay();

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2023, 0, i + 1);
      weekDays.push(d.toLocaleDateString(language, { weekday: "long" }));
    }

    const matrix: CalendarCell[][] = [];
    let dayCounter = 1 - firstWeekday;

    while (dayCounter <= daysInMonth) {
      const week: CalendarCell[] = [];
      for (let i = 0; i < 7; i++) {
        if (dayCounter < 1) {
          const date = new Date(
            prevYear,
            prevMonth,
            prevMonthLastDay + dayCounter
          );
          week.push({ date, type: "prev" });
        } else if (dayCounter > daysInMonth) {
          const date = new Date(nextYear, nextMonth, dayCounter - daysInMonth);
          week.push({ date, type: "next" });
        } else {
          const date = new Date(year, month, dayCounter);
          week.push({ date, type: "current" });
        }
        dayCounter++;
      }
      matrix.push(week);
    }

    while (matrix.length < 6) {
      const lastWeek = matrix[matrix.length - 1];
      let nextDay = lastWeek[lastWeek.length - 1].date.getDate() + 1;
      const week: CalendarCell[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(nextYear, nextMonth, nextDay++);
        week.push({ date, type: "next" });
      }
      matrix.push(week);
    }

    return {
      states: { weekDays, matrix, month, monthStr, year },
      functions: { setMonth, setYear },
    };
  }, [month, year, language]);

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (!ctx)
    throw new Error("useCalendar must be used inside a CalendarProvider");
  return ctx;
}
