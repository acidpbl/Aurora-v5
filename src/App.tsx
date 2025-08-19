import { Card } from "./components/Card";
import { Clock } from "./components/ClockCard";
import { Divider } from "./components/Divider";
import { SettingsCard } from "./components/SettingsCard";

import "./index.css";
import { PiMoonFill, PiSunFill } from "react-icons/pi";
import { useSettings } from "./settings/SettingsContext";
import { Calendar } from "./components/CalendarCard";

function App() {
  const { theme, toggleTheme } = useSettings();

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[var(--bg-color)] ease-linear transition-colors pt-4">
      <SettingsCard.Root>
        <div className="size-full flex items-center justify-end">
          <SettingsCard.ToggleIconButton
            toggled={theme === "dark"}
            onClick={toggleTheme}
            icon={{
              toggle: () => <PiMoonFill />,
              toggled: () => <PiSunFill />,
            }}
          />
        </div>
      </SettingsCard.Root>
      <div className="w-screen min-h-screen grid grid-cols-3 auto-rows-[28rem] gap-4 [grid-auto-flow:dense] px-72 py-4 bg-[var(--bg-color)] ease-linear transition-colors">
        <Card.Root title="calendar" align="start">
          <div className="w-full h-full flex flex-col gap-8 items-center">
            <Calendar.Month />
          </div>
        </Card.Root>
        <Card.Root title="clock" align="start">
          <div className="w-full h-fit flex flex-col gap-4">
            <Clock.Timer variant="24h" />
            <Clock.Timezone />
            <Divider flow="horizontal" />
            <Clock.Date />
          </div>
        </Card.Root>
        <Card.Root title="test" />
      </div>
    </div>
  );
}

export default App;
