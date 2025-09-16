import { twMerge } from "tailwind-merge";
import { useCalendar } from "../../context/CalendarProvider";
import { useDate } from "../../hooks/useDate";
import { Divider } from "../Divider";
import { Tooltip } from "../Tooltip";
import { useSettings } from "../../context/SettingsProvider";

export function CalendarGrid() {
  const { language } = useSettings();
  const { now, holiday } = useDate().states;
  const { matrix, month, year, weekDays } = useCalendar().states;

  const flat = matrix.flat();
  const lastPrevIdx = flat.map((cell) => cell.type).lastIndexOf("prev");
  const firstNextIdx = flat.map((cell) => cell.type).indexOf("next");

  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  return (
    <div className="flex flex-col gap-4 px-6 py-2 lowercase">
      <div className="p-2 rounded-lg bg-background flex flex-col gap-1 border-2 border-tertiary ease-linear transition-colors">
        <div className="grid grid-cols-7 gap-2 px-4">
          {weekDays.map((wd, i) => (
            <Tooltip key={i} content={wd} position="top">
              <span
                className={twMerge(
                  "flex items-center justify-center aspect-square font-jetbrains text-sm font-semibold uppercase tracking-wide rounded-lg transition-colors ease-linear",
                  isCurrentMonth && i === now.getDay()
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary"
                )}
              >
                {language === "en-us" ? wd[0] : wd.substring(0, 3)}
              </span>
            </Tooltip>
          ))}
        </div>
        <Divider float="horizontal" />
        <div className="grid grid-cols-7 gap-x-2 gap-y-1 px-4">
          {flat.map(({ date, type }, i) => {
            const isToday =
              type === "current" &&
              date.getDate() === now.getDate() &&
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear();

            const holidayInfo = holiday.isHoliday(date);
            const isHoliday = !!holidayInfo;
            const holidayNames = Array.isArray(holidayInfo)
              ? holidayInfo.map((h) => h.name).join(", ")
              : "";

            return (
              <Tooltip
                key={i}
                content={
                  <>
                    {language === "en-us" ? (
                      <>
                        {date.toLocaleDateString(language, {
                          month: "short",
                        })}{" "}
                        {i}, {year}
                      </>
                    ) : (
                      <>
                        {i} de{" "}
                        {date.toLocaleDateString(language, {
                          month: "short",
                        })}{" "}
                        de {year}
                      </>
                    )}
                    <br />
                    <span
                      className={
                        type === "current" ? "text-primary" : "text-secondary"
                      }
                    >
                      {isHoliday && holidayNames}
                    </span>
                  </>
                }
                position="top"
              >
                <span
                  className={twMerge(
                    "flex items-center justify-center aspect-square font-jetbrains font-bold rounded-xl border transition-all duration-200 select-none relative ease-linear",
                    type === "current"
                      ? "text-text-primary border-transparent hover:bg-tertiary hover:text-primary"
                      : "text-text-primary/40 border-transparent hover:text-text-secondary hover:bg-background/50",
                    i === lastPrevIdx && "rounded-br-2xl",
                    i === firstNextIdx && "rounded-tl-2xl",
                    isToday &&
                      "bg-primary text-white shadow-md hover:bg-primary-hover hover:shadow-lg",
                    type !== "current" &&
                      "hover:text-text-secondary/20 hover:bg-card/20",
                    isHoliday &&
                      (type === "current"
                        ? "after:content-[''] after:absolute after:size-1 after:bg-primary after:mt-6 after:rounded-full"
                        : "after:content-[''] after:absolute after:size-1 after:bg-secondary/70 after:mt-6 after:rounded-full")
                  )}
                >
                  {date.getDate()}
                </span>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
