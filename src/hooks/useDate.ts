import { useEffect, useState } from "react";
import Holidays from "date-holidays";
import { useSettings } from "../context/SettingsProvider";

export function useDate() {
  const { language } = useSettings();

  const [now, setNow] = useState(new Date());

  const weekday = now.toLocaleDateString(language, { weekday: "long" });
  const month = now.getMonth();
  const monthStr = now.toLocaleDateString(language, { month: "long" });
  const day = now.getDate();
  const year = now.getFullYear();

  const holiday = new Holidays("BR");
  const isHoliday = holiday.isHoliday(now);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    states: { now, weekday, month, monthStr, day, year, holiday, isHoliday },
    functions: { setNow },
  };
}
