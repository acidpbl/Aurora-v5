import { twMerge } from "tailwind-merge";
import { useSettings } from "../../context/SettingsProvider";
import { useDate } from "../../hooks/useDate";

export function CardTimer() {
  const { now } = useDate().states;
  const { timeFormat } = useSettings();

  const hours = now.getHours();
  const hoursAMPM = (timeFormat === "ampm" ? hours % 12 || 12 : hours)
    .toString()
    .padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex w-full justify-center gap-4">
      <div className="flex size-fit px-8 py-8 rounded-lg border-2 border-tertiary text-secondary hover:text-secondary-hover text-5xl font-bold font-jetbrains bg-background hover:bg-primary-hover hover:border-secondary ease-linear transition-colors">
        {hoursAMPM}:{minutes}:{seconds}
      </div>
      {timeFormat === "ampm" && (
        <div className="w-full h-16 rounded-lg border-2 border-tertiary self-center ease-linear transition-colors flex flex-col overflow-hidden">
          <span
            className={twMerge(
              "w-full h-full text-center font-jetbrains flex items-center justify-center ease-linear transition-colors",
              hours < 12
                ? "text-background bg-primary-hover font-bold"
                : "text-primary/50 bg-card"
            )}
          >
            AM
          </span>
          <span
            className={twMerge(
              "w-full h-full text-center font-jetbrains flex items-center justify-center ease-linear transition-colors",
              hours > 12
                ? "text-background bg-primary-hover font-bold"
                : "text-primary/50 bg-card"
            )}
          >
            PM
          </span>
        </div>
      )}
    </div>
  );
}
