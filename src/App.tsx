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

export function App() {
  const { weekday, monthStr, day, year, isHoliday } = useDate().states;
  const { toggleTheme, theme } = useSettings();
  return (
    <div className="w-screen h-full bg-background md:px-24 lg:px-72 py-4 flex flex-col gap-4 ease-linear transition-colors">
      <Header.Root>
        <Header.Toggle
          toggled={theme === "dark"}
          icon={{ toggle: PiMoonFill, toggled: PiSunFill }}
          onClick={toggleTheme}
        />
      </Header.Root>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card.Root title="calendar">
          <div className="h-full flex flex-col">
            <CalendarProvider>
              <Calendar.Header />
              <Calendar.Grid />
            </CalendarProvider>
          </div>
        </Card.Root>
        <Card.Root title="clock">
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
        <Card.Root></Card.Root>
        <Card.Root></Card.Root>
        <Card.Root></Card.Root>
        <Card.Root></Card.Root>
      </div>
      <Footer.Root></Footer.Root>
    </div>
  );
}
