import { useWeather } from "../../hooks/useWeather";
import { Divider } from "../Divider";

interface DataProps {
  city?: string;
}

export function Data({ city }: DataProps) {
  const { weather, loading, error } = useWeather(city);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
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
    <div className="size-full flex flex-col bg-secondary rounded shadow items-center p-2 px-8 gap-4 font-poppins">
      <h1 className="text-text font-poppins">{weather.location}</h1>
      <div className="size-fit flex flex-col items-center gap-4">
        <div className="w-full flex items-center justify-center gap-4">
          <span className="p-1 rounded bg-card hover:bg-accent ease-linear transition-colors">
            <img
              src={weather.icon}
              alt={weather.condition}
              className="drop-shadow"
            />
          </span>
          <p className="font-jetbrains text-2xl font-semibold text-text">
            {weather.temp_c.toFixed(0)}°C
          </p>
        </div>
        <p className="capitalize text-text">{weather.condition}</p>
      </div>
      <Divider flow="horizontal" />
      <div className="size-full flex flex-col gap-2 items-center text-text font-light">
        <p className="drop-shadow">
          Wind: {weather.wind_kph.toFixed(1)} km/h{" "}
          {getWindEmoji(weather.wind_kph)}
        </p>
        <p className="drop-shadow">
          Humidity: {weather.humidity}% {getHumidityEmoji(weather.humidity)}
        </p>
      </div>
    </div>
  );
}
