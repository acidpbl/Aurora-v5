import { twMerge } from "tailwind-merge";
import { useStopwatch } from "../../context/StopwatchProvider";
import { timeFormat } from "../../utils/stringFormat";

export function StopwatchSaved() {
  const { saved } = useStopwatch();

  if (saved.length === 0) return null;

  const reversedSaved = [...saved].reverse();

  return (
    <div className="flex flex-col gap-0.5 py-2 px-4 rounded-lg border-2 border-tertiary bg-background ease-linear max-h-40 overflow-y-auto w-fit self-center">
      {reversedSaved.map((s, index) => {
        const hours = Math.floor(s / 3600000);
        const minutes = Math.floor((s % 3600000) / 60000);
        const seconds = Math.floor((s % 60000) / 1000);
        const milliseconds = Math.floor(s % 1000);

        const realIndex = saved.length - index;

        return (
          <span
            key={index}
            className={twMerge(
              "font-jetbrains text-text-primary pl-2 pr-4 w-full border-b border-text-primary flex",
              index === 0 && "text-primary"
            )}
          >
            <span className="text-secondary text-xs min-w-12 self-center">
              {realIndex}°.{" "}
            </span>
            {timeFormat(hours)}:{timeFormat(minutes)}:{timeFormat(seconds)}:
            {milliseconds.toString().padStart(3, "0")}
          </span>
        );
      })}
    </div>
  );
}
