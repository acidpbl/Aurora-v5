import { useSettings } from "../../context/SettingsProvider";
import { useWeather } from "../../hooks/useWeather";
import { Divider } from "../Divider";

interface WeatherDataProps {
  city?: string;
}

export function WeatherData({ city }: WeatherDataProps) {
  const { language } = useSettings();
  const { weather, loading, error } = useWeather(city);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p className="text-text-primary">Error: {error}</p>;
  if (!weather) return <p>No weather data available</p>;

  const getHumidityEmoji = (humidity: number) => {
    if (humidity < 30) return "🥵";
    if (humidity > 60) return "💧";
    return "✅";
  };

  const getWindEmoji = (windKph: number) => {
    if (windKph <= 10) return "🌬️";
    if (windKph <= 25) return "💨";
    return "🌪️";
  };

  return (
    <div className="size-full flex flex-col bg-background rounded-lg border-2 border-tertiary items-center p-2 px-8 gap-4 font-poppins ease-linear transition-colors justify-center lowercase">
      <div className="size-fit flex flex-col items-center gap-4">
        <div className="w-full flex items-center justify-center gap-4">
          <span className="p-1 rounded-lg border-2 border-tertiary bg-card hover:bg-primary-hover hover:border-secondary ease-linear transition-colors">
            <img src={weather.icon} alt={weather.condition} />
          </span>
          <div className="flex flex-col gap-2">
            <p className="font-jetbrains text-2xl font-semibold text-text-primary">
              {weather.temp_c.toFixed(0)}°C
            </p>
            <p className="font-jetbrains text-xl font-semibold text-secondary/50">
              {weather.temp_f.toFixed(0)}°F
            </p>
          </div>
        </div>
        <p className="text-text-primary text-xl">{weather.condition}</p>
      </div>
      <Divider float="horizontal" />
      <div className="size-fit flex flex-col gap-2 items-center text-text-primary font-light text-lg">
        <p>
          <b className="font-semibold">
            {language === "en-us" ? "Wind" : "Ventos"}:{" "}
          </b>
          {weather.wind_kph.toFixed(1)} km/h {getWindEmoji(weather.wind_kph)}
        </p>
        <p>
          <b className="font-semibold">
            {language === "en-us" ? "Humidity" : "Humidade"}:{" "}
          </b>{" "}
          {weather.humidity}% {getHumidityEmoji(weather.humidity)}
        </p>
      </div>
    </div>
  );
}
