/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";

export interface Weather {
  location: string;
  temp_c: number;
  temp_f: number;
  condition: string;
  icon: string;
  wind_kph: number;
  humidity: number;
}

export function useWeather(cityInput?: string) {
  const { latitude, longitude, language } = useSettings();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      !cityInput &&
      (!latitude ||
        !longitude ||
        latitude === "Permission denied" ||
        latitude === "Not supported")
    )
      return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        let URL = "";

        if (cityInput) {
          URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            cityInput
          )}&units=metric&lang=${language}&appid=${apiKey}`;
        } else {
          URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=${language.replace(
            "-",
            "_"
          )}&appid=${apiKey}`;
        }

        const response = await fetch(URL);
        if (!response.ok) throw new Error("Failed to fetch weather");
        const data = await response.json();

        setWeather({
          location: cityInput ? `${data.name}, ${data.sys.country}` : data.name,
          temp_c: data.main.temp,
          temp_f: (data.main.temp * 9) / 5 + 32,
          condition: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          wind_kph: data.wind.speed * 3.6,
          humidity: data.main.humidity,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, cityInput, language]);

  return { weather, loading, error };
}
