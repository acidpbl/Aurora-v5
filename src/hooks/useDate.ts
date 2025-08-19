import { useEffect, useState } from "react";

export const useDate = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setNow(date);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { now };
};
