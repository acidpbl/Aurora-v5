import { useDate } from "../../hooks/useDate";

export function CardTimezone() {
  const { now } = useDate().states;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const offsetMinutes = now.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes <= 0 ? "+" : "-";
  const formattedOffset =
    "UTC" +
    sign +
    offsetHours.toString().padStart(2, "0") +
    (offsetMins ? `:${offsetMins.toString().padStart(2, "0")}` : "");

  return (
    <div className="w-full flex justify-center">
      <span className="text-text-primary hover:text-secondary ease-linear transition-colors text-lg font-jetbrains font-semibold">
        {tz} ({formattedOffset})
      </span>
    </div>
  );
}
