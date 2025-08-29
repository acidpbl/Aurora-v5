/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { setCookie, getCookie } from "../utils/cookieUtils";

type Theme = "light" | "dark";
type Language = string;
type TimeFormat = "24h" | "ampm";

interface SettingsContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;

  timezone: string;
  setTimezone: (tz: string) => void;

  dateFormat: string;
  setDateFormat: (format: string) => void;

  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => void;

  latitude: string;
  setLatitude: (lat: string) => void;
  longitude: string;
  setLongitude: (lat: string) => void;
  initialLatitude: string;
  initialLongitude: string;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(
    () => (getCookie("theme") as Theme) || "dark"
  );

  const [language, setLanguageState] = useState<Language>(
    () => getCookie("language") || "en-us"
  );

  const [timezone, setTimezoneState] = useState<string>(
    () =>
      getCookie("timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [dateFormat, setDateFormatState] = useState<string>(
    () => getCookie("dateFormat") || "MM/DD/YYYY"
  );

  const [timeFormat, setTimeFormatState] = useState<TimeFormat>(
    () => (getCookie("timeFormat") as TimeFormat) || "ampm"
  );

  const [latitude, setLatitude] = useState<string>(
    () => getCookie("latitude") || ""
  );
  const [longitude, setLongitude] = useState<string>(
    () => getCookie("longitude") || ""
  );
  const initialLatitude = useRef<string>(getCookie("latitude") || "");
  const initialLongitude = useRef<string>(getCookie("longitude") || "");

  useEffect(() => {
    if (!latitude || !longitude) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude.toString();
            const lon = pos.coords.longitude.toString();

            setLatitude(lat);
            setLongitude(lon);

            if (!initialLatitude.current) initialLatitude.current = lat;
            if (!initialLongitude.current) initialLongitude.current = lon;
          },
          (err) => {
            console.warn("Geolocation denied:", err.message);
            setLatitude("Permission denied");
            setLongitude("Permission denied");

            if (!initialLatitude.current)
              initialLatitude.current = "Permission denied";
            if (!initialLongitude.current)
              initialLongitude.current = "Permission denied";
          }
        );
      } else {
        setLatitude("Not supported");
        setLongitude("Not supported");

        if (!initialLatitude.current) initialLatitude.current = "Not supported";
        if (!initialLongitude.current)
          initialLongitude.current = "Not supported";
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie("theme", theme);
  }, [theme]);

  useEffect(() => setCookie("language", language), [language]);
  useEffect(() => setCookie("timezone", timezone), [timezone]);
  useEffect(() => setCookie("dateFormat", dateFormat), [dateFormat]);
  useEffect(() => setCookie("timeFormat", timeFormat), [timeFormat]);
  useEffect(() => setCookie("latitude", latitude), [latitude]);
  useEffect(() => setCookie("longitude", longitude), [longitude]);

  const setTheme = (theme: Theme) => setThemeState(theme);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));

  const value: SettingsContextProps = {
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage: setLanguageState,
    timezone,
    setTimezone: setTimezoneState,
    dateFormat,
    setDateFormat: setDateFormatState,
    timeFormat,
    setTimeFormat: setTimeFormatState,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    initialLatitude: initialLatitude.current,
    initialLongitude: initialLongitude.current,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
