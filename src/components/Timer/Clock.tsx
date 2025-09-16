import { useEffect, useRef } from "react";
import { useTimer } from "../../context/TimerProvider";
import { timeFormat } from "../../utils/stringFormat";

export function TimerClock() {
  const { time, setTime, power } = useTimer();
  const endTimeRef = useRef<number | null>(null);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (!power || time <= 0) {
      endTimeRef.current = null;
      return;
    }

    // marca o "horário de término"
    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + time * 1000;
    }

    const tick = () => {
      if (!endTimeRef.current) return;

      const diff = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );
      setTime(diff);

      if (diff > 0) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);

    return () => {
      endTimeRef.current = null;
    };
  }, [power]);

  // atualizar quando usuário mexe manualmente
  useEffect(() => {
    if (!power && time > 0) {
      endTimeRef.current = null;
    }
  }, [time, power]);

  const handleChange = (unit: "h" | "m" | "s", value: number) => {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (unit === "h") totalSeconds += (value - hours) * 3600;
    if (unit === "m") totalSeconds += (value - minutes) * 60;
    if (unit === "s") totalSeconds += value - seconds;

    if (totalSeconds < 0) totalSeconds = 0;

    setTime(totalSeconds);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    unit: "h" | "m" | "s"
  ) => {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (e.key === "ArrowUp") {
      if (unit === "h") totalSeconds += 3600;
      if (unit === "m") totalSeconds += 60;
      if (unit === "s") totalSeconds += 1;
      e.preventDefault();
    }
    if (e.key === "ArrowDown") {
      if (unit === "h") totalSeconds -= 3600;
      if (unit === "m") totalSeconds -= 60;
      if (unit === "s") totalSeconds -= 1;
      e.preventDefault();
    }

    if (totalSeconds < 0) totalSeconds = 0;
    setTime(totalSeconds);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex gap-2 px-6 py-6 rounded-lg border-2 border-tertiary bg-background text-secondary font-jetbrains font-bold text-5xl ease-linear transition-colors hover:bg-primary-hover hover:border-secondary hover:text-secondary-hover">
        <input
          type="number"
          className="w-16 text-center bg-transparent text-inherit border-none focus:outline-none"
          value={timeFormat(hours)}
          min={0}
          onChange={(e) => handleChange("h", Number(e.target.value))}
          onKeyDown={(e) => handleKeyDown(e, "h")}
        />
        <span>:</span>
        <input
          type="number"
          className="w-16 text-center bg-transparent text-inherit border-none focus:outline-none"
          value={timeFormat(minutes)}
          min={0}
          onChange={(e) => handleChange("m", Number(e.target.value))}
          onKeyDown={(e) => handleKeyDown(e, "m")}
        />
        <span>:</span>
        <input
          type="number"
          className="w-16 text-center bg-transparent text-inherit border-none focus:outline-none"
          value={timeFormat(seconds)}
          min={0}
          onChange={(e) => handleChange("s", Number(e.target.value))}
          onKeyDown={(e) => handleKeyDown(e, "s")}
        />
      </div>
    </div>
  );
}
