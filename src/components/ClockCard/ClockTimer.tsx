import { useEffect, useState } from "react";
import { useDate } from "../../hooks/useDate";

interface ClockTimerProps {
  variant?: "24h" | "ampm";
}

export function ClockTimer({ variant = "24h" }: ClockTimerProps) {
  const { now } = useDate();
  const [ampm, setAmpm] = useState(now.getHours() >= 12 ? "PM" : "AM");

  let hours = now.getHours();

  useEffect(() => {
    const interval = setInterval(() => {
      setAmpm(now.getHours() >= 12 ? "PM" : "AM");
    }, 1000);
    return () => clearInterval(interval);
  }, [now]);

  if (variant === "ampm") {
    hours = hours % 12 || 12;
  }

  const hoursStr = hours.toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const ampmIndex = ampm === "AM" ? 0 : 1;

  return (
    <span className="w-full h-fit flex flex-row items-center justify-center gap-6">
      <span className="text-center text-5xl font-jetbrains font-bold bg-secondary rounded-md p-8 text-accent-text shadow hover:bg-accent hover:text-text-hover ease-linear transition-colors">
        {hoursStr}:{minutes}:{seconds}
      </span>
      {variant === "ampm" && (
        <span className="relative w-20 h-24 flex items-center ease-linear transition-colors">
          <span
            className="absolute left-0 top-0 w-full h-[200%] flex flex-col transition-transform duration-300"
            style={{ transform: `translateY(-${ampmIndex * 50}%)` }}
          >
            <span
              className={`px-4 py-2 font-poppins flex items-center justify-center font-bold text-lg rounded-t transition-colors duration-300 ${
                ampm === "AM"
                  ? "bg-accent text-accent-text"
                  : "bg-secondary text-gray-400"
              }`}
            >
              AM
            </span>
            <span
              className={`px-4 py-2 font-poppins flex items-center justify-center font-bold text-lg rounded-b transition-colors duration-300 ${
                ampm === "PM"
                  ? "bg-accent text-accent-text"
                  : "bg-secondary text-gray-400"
              }`}
            >
              PM
            </span>
          </span>
        </span>
      )}
    </span>
  );
}
