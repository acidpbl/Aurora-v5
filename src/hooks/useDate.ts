import { useEffect, useState } from "react";

export function useDate() {
  const [now, setNow] = useState(new Date());
  const weekday = now.toLocaleDateString("en-us", { weekday: "long" });
  const month = now.toLocaleDateString("en-us", { month: "long" });
  const day = now.getDate();
  const year = now.getFullYear();

  useEffect(() => {
    setNow(new Date());
  }, [now]);

  return { states: { now, weekday, month, day, year }, functions: { setNow } };
}
