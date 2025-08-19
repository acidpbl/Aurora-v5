import { useDate } from "../../hooks/useDate";

export function ClockDate() {
  const { now } = useDate();

  const weekday = now.toLocaleDateString("en-us", { weekday: "long" });
  const month = now.toLocaleDateString("en-us", { month: "long" });
  const day = now.getDate();
  const year = now.getFullYear();

  return (
    <div className="w-full h-fit flex flex-col items-center gap-4">
      <span className="font-jetbrains text-text text-xl">{weekday}</span>
      <span className="font-jetbrains text-text text-2xl font-semibold">
        {month} {day}, {year}
      </span>
    </div>
  );
}
