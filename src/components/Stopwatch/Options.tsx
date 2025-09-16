import { BsPlayFill, BsStopFill } from "react-icons/bs";
import { Card } from "../Card";
import { useStopwatch } from "../../context/StopwatchProvider";
import {
  PiBroomFill,
  PiArrowClockwiseFill,
  PiArrowCounterClockwiseFill,
  PiFloppyDiskFill,
} from "react-icons/pi";
import { useSettings } from "../../context/SettingsProvider";

export function StopwatchOptions() {
  const { power, togglePower, resetTime, saveTime, resetSaved, resetPowered } =
    useStopwatch();
  const { language } = useSettings();
  return (
    <div className="w-full flex gap-2 justify-center">
      <Card.Toggle
        icon={{ toggle: BsPlayFill, toggled: BsStopFill }}
        toggled={power}
        onClick={togglePower}
        label={{
          toggle: language === "en-us" ? "play" : "iniciar",
          toggled: language === "en-us" ? "stop" : "parar",
        }}
      />
      <Card.Button
        icon={PiArrowClockwiseFill}
        onClick={resetTime}
        label={language === "en-us" ? "reset" : "reiniciar"}
      />
      <Card.Button
        icon={PiFloppyDiskFill}
        onClick={saveTime}
        label={language === "en-us" ? "save" : "salvar"}
      />
      <Card.Button
        icon={PiBroomFill}
        onClick={resetSaved}
        label={language === "en-us" ? "clear" : "limpar"}
      />
      <Card.Button
        icon={PiArrowCounterClockwiseFill}
        onClick={resetPowered}
        label={language === "en-us" ? "restart" : "recomeçar"}
      />
    </div>
  );
}
