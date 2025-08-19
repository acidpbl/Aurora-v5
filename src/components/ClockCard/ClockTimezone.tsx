export function ClockTimezone() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes <= 0 ? "+" : "-";
  const formattedOffset =
    "UTC" +
    sign +
    offsetHours.toString().padStart(2, "0") +
    (offsetMins ? `:${offsetMins.toString().padStart(2, "0")}` : "");

  return (
    <p className="self-center text-text font-jetbrains text-md opacity-75 hover:text-accent transition-colors ease-linear">
      {tz} ({formattedOffset})
    </p>
  );
}
