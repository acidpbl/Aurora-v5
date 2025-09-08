import { useDate } from "../../hooks/useDate";

export function CardTimer() {
  const { now } = useDate().states;

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex w-full justify-center gap-4">
      <div className="flex size-fit px-8 py-8 rounded-lg border-2 border-tertiary text-secondary hover:text-secondary-hover text-5xl font-bold font-jetbrains bg-card hover:bg-primary-hover hover:border-secondary ease-linear transition-colors">
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}
