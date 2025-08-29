import { Card } from "./components/Card";
import { Clock } from "./components/ClockCard";
import { Divider } from "./components/Divider";
import { SettingsCard } from "./components/SettingsCard";
import { PiMoonFill, PiSunFill } from "react-icons/pi";
import { useSettings } from "./context/SettingsContext";
import { Calendar } from "./components/CalendarCard";
import { BR, US } from "country-flag-icons/react/1x1";

import "./index.css";
import { Weather } from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import { useState } from "react";

function App() {
  const settings = useSettings();
  const [searchCity, setSearchCity] = useState<string | undefined>(undefined);

  const { weather } = useWeather(searchCity);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[var(--bg-color)] ease-linear transition-colors pt-4">
      <SettingsCard.Root>
        <div className="flex items-center w-full justify-end gap-2">
          <SettingsCard.ToggleIconButton
            toggled={settings.theme === "dark"}
            onClick={settings.toggleTheme}
            icon={{
              toggle: () => <PiMoonFill />,
              toggled: () => <PiSunFill />,
            }}
          />
          <SettingsCard.SelectMenu
            value={settings.language}
            onChange={(e) => settings.setLanguage(e)}
            options={[
              {
                icon: <BR className="size-4 rounded" />,
                value: "pt-br",
              },
              {
                icon: <US className="size-4 rounded" />,
                value: "en-us",
              },
            ]}
          />
          <SettingsCard.SelectMenu
            value={settings.timeFormat}
            onChange={(e) =>
              settings.setTimeFormat(e === "24h" ? "24h" : "ampm")
            }
            options={[
              { label: "12h", value: "ampm" },
              { label: "24h", value: "24h" },
            ]}
          />
        </div>
      </SettingsCard.Root>

      <div className="grid grid-cols-3 auto-rows-[28rem] gap-4 [grid-auto-flow:dense] px-72 py-4 bg-[var(--bg-color)] ease-linear transition-colors">
        <Card.Root title="calendar" align="start">
          <div className="w-full h-full flex flex-col gap-8 items-center">
            <Calendar.Month />
          </div>
        </Card.Root>

        <Card.Root title="clock" align="start" cardClass="items-center">
          <div className="w-full h-fit flex flex-col gap-4">
            <Clock.Timer variant={settings.timeFormat} />
            <Clock.Timezone />
            <Divider flow="horizontal" />
            <Clock.Date />
          </div>
        </Card.Root>

        <Card.Root
          title={`weather ${
            weather?.location !== undefined ? "on " + weather.location : ""
          }`}
          cardClass="flex-col gap-4"
        >
          <Card.Input
            placeholder={weather?.location || "Search location..."}
            onSearch={(value) =>
              setSearchCity(value.length ? value : undefined)
            }
          />
          <Weather.Data city={searchCity} />
        </Card.Root>
      </div>
    </div>
  );
}

export default App;
