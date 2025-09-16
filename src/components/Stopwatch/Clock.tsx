import { useStopwatch } from "../../context/StopwatchProvider";
import { timeFormat } from "../../utils/stringFormat";

export function StopwatchClock() {
  const { time } = useStopwatch();

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor(time % 1000);

  return (
    <div className="flex w-full justify-center gap-4 lowercase">
      <div className="flex size-fit px-8 py-8 rounded-lg border-2 border-tertiary text-secondary hover:text-secondary-hover text-5xl font-bold font-jetbrains bg-background hover:bg-primary-hover hover:border-secondary ease-linear transition-colors">
        {timeFormat(hours)}:{timeFormat(minutes)}:{timeFormat(seconds)}:
        <span className="text-2xl self-end">
          {milliseconds.toString().padStart(3, "0").padEnd(3, "0")}
        </span>
      </div>
    </div>
  );
}
