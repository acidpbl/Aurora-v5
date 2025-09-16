import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { setCookie, getCookie } from "../utils/cookieUtils";

interface StopwatchContextValue {
  time: number;
  resetTime: () => void;
  power: boolean;
  setPower: (value: boolean) => void;
  togglePower: () => void;
  resetPowered: () => void;
  saved: number[];
  saveTime: () => void;
  resetSaved: () => void;
}

interface StopwatchProviderProps {
  children: ReactNode;
  stopwatchId: string;
}

const StopwatchContext = createContext<StopwatchContextValue | undefined>(
  undefined
);

export function StopwatchProvider({
  children,
  stopwatchId,
}: StopwatchProviderProps) {
  const initialTime = Number(getCookie(`${stopwatchId}_time`) || 0);
  const initialPower = getCookie(`${stopwatchId}_power`) === "true";
  const initialSaved = JSON.parse(
    getCookie(`${stopwatchId}_saved`) || "[]"
  ) as number[];

  const [time, setTime] = useState(initialTime);
  const [power, setPower] = useState(initialPower);
  const [saved, setSaved] = useState(initialSaved);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [powered, setPowered] = useState(false);

  useEffect(() => setCookie(`${stopwatchId}_time`, String(time)), [time]);
  useEffect(() => setCookie(`${stopwatchId}_power`, String(power)), [power]);
  useEffect(
    () => setCookie(`${stopwatchId}_saved`, JSON.stringify(saved)),
    [saved]
  );

  useEffect(() => {
    if (!power) return;

    const start = startTimestamp ?? Date.now() - time;
    setStartTimestamp(start);

    const interval = setInterval(() => {
      setTime(Date.now() - start);
    }, 16);

    return () => clearInterval(interval);
  }, [power, startTimestamp]);

  const togglePower = () => {
    setPower((prev) => !prev);
  };

  const resetTime = () => {
    setPower(false);
    setTime(0);
    setStartTimestamp(null);
    setPowered(false);
  };

  const resetPowered = () => {
    setTime(0);
    setStartTimestamp(Date.now());
    setPowered(true);
  };

  const saveTime = () => {
    setSaved((prev) =>
      prev.includes(time) && !powered ? prev : [...prev, time]
    );
  };

  const resetSaved = () => setSaved([]);

  return (
    <StopwatchContext.Provider
      value={{
        time,
        power,
        saved,
        togglePower,
        setPower,
        resetTime,
        saveTime,
        resetSaved,
        resetPowered,
      }}
    >
      {children}
    </StopwatchContext.Provider>
  );
}

export function useStopwatch() {
  const context = useContext(StopwatchContext);
  if (!context)
    throw new Error("useStopwatch deve ser usado dentro de StopwatchProvider");
  return context;
}
