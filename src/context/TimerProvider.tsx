import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { getCookie, setCookie } from "../utils/cookieUtils";

interface TimerContextValue {
  time: number;
  setTime: (value: number | ((prev: number) => number)) => void;
  resetTime: () => void;
  power: boolean;
  setPower: (value: boolean) => void;
  togglePower: () => void;
  saved: number[];
  saveTime: () => void;
  resetSaved: () => void;
}

interface TimerProviderProps {
  children: ReactNode;
  timerId: string;
}

const TimerContext = createContext<TimerContextValue | undefined>(undefined);

export function TimerProvider({ children, timerId }: TimerProviderProps) {
  const initialTime = Number(getCookie(`${timerId}_time`) || 0);
  const initialPower = getCookie(`${timerId}_power`) === "true";
  const initialSaved = JSON.parse(
    getCookie(`${timerId}_saved`) || "[]"
  ) as number[];

  const [time, setTimeState] = useState(initialTime);
  const [power, setPower] = useState(initialPower);
  const [saved, setSaved] = useState(initialSaved);

  // Salvar cookies
  useEffect(() => setCookie(`${timerId}_time`, String(time)), [time]);
  useEffect(() => setCookie(`${timerId}_power`, String(power)), [power]);
  useEffect(
    () => setCookie(`${timerId}_saved`, JSON.stringify(saved)),
    [saved]
  );

  const setTime = (value: number | ((prev: number) => number)) => {
    if (typeof value === "function") {
      setTimeState((prev) => (value as (prev: number) => number)(prev));
    } else {
      setTimeState(value);
    }
  };

  const resetTime = () => setTimeState(0);

  const togglePower = () => setPower((prev) => !prev);

  const saveTime = () =>
    setSaved((prev) =>
      [...prev].includes(time) ? [...prev] : [...prev, time]
    );

  const resetSaved = () => setSaved([]);

  return (
    <TimerContext.Provider
      value={{
        time,
        setTime,
        resetTime,
        power,
        setPower,
        togglePower,
        saved,
        saveTime,
        resetSaved,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within TimerProvider");
  return context;
};
