import { PiMoonFill, PiSunFill } from "react-icons/pi";
import { Card } from "./components/Card";
import { Clock } from "./components/Clock";
import { Divider } from "./components/Divider";
import { Header } from "./components/Header/index";
import { useSettings } from "./context/SettingsProvider";
import { useDate } from "./hooks/useDate";
import "./index.css";
import { Calendar } from "./components/Calendar";
import { CalendarProvider } from "./context/CalendarProvider";
import { Footer } from "./components/Footer";
import { BR, US } from "country-flag-icons/react/1x1";
import { Weather } from "./components/Weather";
import { useWeather } from "./hooks/useWeather";
import { useState } from "react";
import { Stopwatch } from "./components/Stopwatch";
import { StopwatchProvider } from "./context/StopwatchProvider";
import { TimerProvider } from "./context/TimerProvider";
import { Timer } from "./components/Timer";

export function App() {
  const { weekday, monthStr, day, year, isHoliday } = useDate().states;
  const {
    toggleTheme,
    theme,
    setLanguage,
    language,
    timeFormat,
    toggleTimeFormat,
  } = useSettings();

  const [weatherLocation, setWeatherLocation] = useState<string>("");
  const [weatherQuery, setWeatherQuery] = useState<string>("");

  const { weather } = useWeather(weatherQuery);

  function handleWeatherInputSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWeatherQuery(weatherLocation);
  }
  return (
    <div className="w-screen h-full bg-background md:px-24 lg:px-72 py-4 flex flex-col gap-4 ease-linear transition-colors">
      <Header.Root>
        <Header.Toggle
          toggled={timeFormat === "24h"}
          value={timeFormat}
          options={{ toggle: "24h", toggled: "ampm" }}
          title={language === "en-us" ? "time format" : "formato da hora"}
          onClick={toggleTimeFormat}
        />
        <Header.SelectMenu
          value={language}
          title={language === "en-us" ? "language" : "idioma"}
          options={[
            { value: "en-us", icon: <US className="rounded" /> },
            { value: "pt-br", icon: <BR className="rounded" /> },
          ]}
          onchange={(e) => setLanguage(e)}
        />
        <Header.ToggleIcon
          toggled={theme === "dark"}
          title={language === "en-us" ? "theme" : "tema"}
          icon={{ toggle: PiMoonFill, toggled: PiSunFill }}
          onClick={toggleTheme}
        />
      </Header.Root>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card.Root title={language === "en-us" ? "calendar" : "calendário"}>
          <div className="h-full flex flex-col">
            <CalendarProvider>
              <Calendar.Header />
              <Calendar.Grid />
            </CalendarProvider>
          </div>
        </Card.Root>
        <Card.Root title={language === "en-us" ? "clock" : "relógio"}>
          <div className="w-full h-fit flex flex-col items-start gap-4 p-4">
            <Clock.Timer />
            <Clock.Timezone />
          </div>

          <Divider float="horizontal" />
          <div className="flex flex-col gap-4 p-4 items-center">
            <span className="text-text-secondary font-poppins text-xl ease-linear transition-colors">
              {weekday}
            </span>
            <span className="text-text-secondary font-poppins text-2xl font-medium ease-linear transition-colors">
              {monthStr} {day}, {year}
            </span>
            {isHoliday && (
              <span className="text-primary font-poppins text-xl ease-linear transition-colors">
                {isHoliday[0].name}
              </span>
            )}
          </div>
        </Card.Root>
        <Card.Root
          title={
            language === "en-us" ? (
              <span className="flex gap-2">
                weather
                {weather?.location && (
                  <>
                    <span>in</span>
                    <span className="text-primary font-semibold">
                      {weather.location}
                    </span>
                  </>
                )}
              </span>
            ) : (
              <span className="flex gap-2">
                clima
                {weather?.location && (
                  <>
                    <span>em</span>
                    <span className="text-primary font-semibold">
                      {weather.location}
                    </span>
                  </>
                )}
              </span>
            )
          }
        >
          <div className="size-full flex flex-col gap-2">
            <form onSubmit={handleWeatherInputSubmit} className="w-full flex">
              <Weather.Input
                placeholder={weather?.location || "Enter city"}
                value={weatherLocation}
                onChange={(e) => setWeatherLocation(e.target.value)}
              />
            </form>
            <Weather.Data city={weatherQuery} />
          </div>
        </Card.Root>
        <Card.Root title={language === "en-us" ? "stopwatch" : "cronômetro"}>
          <StopwatchProvider stopwatchId="stopwatch_default">
            <div className="px-3 flex flex-col gap-2 h-full">
              <Stopwatch.Clock />
              <Stopwatch.Options />
              <Stopwatch.Saved />
            </div>
          </StopwatchProvider>
        </Card.Root>
        <Card.Root title={language === "en-us" ? "timer" : "temporizador"}>
          <TimerProvider timerId="timer_default">
            <div className="px-3 flex flex-col gap-2 h-full">
              <Timer.Clock />
              <Timer.Options />
              <Timer.Saved />
            </div>
          </TimerProvider>
        </Card.Root>
        <Card.Root></Card.Root>
      </div>
      <Footer.Root></Footer.Root>
    </div>
  );
}
