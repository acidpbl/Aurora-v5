/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
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

  geolocation: string;
  setGeolocation: (loc: string) => void;
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

  const [geolocation, setGeolocationState] = useState<string>(
    () => getCookie("geolocation") || ""
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie("theme", theme);
  }, [theme]);

  useEffect(() => setCookie("language", language), [language]);
  useEffect(() => setCookie("timezone", timezone), [timezone]);
  useEffect(() => setCookie("dateFormat", dateFormat), [dateFormat]);
  useEffect(() => setCookie("timeFormat", timeFormat), [timeFormat]);
  useEffect(() => setCookie("geolocation", geolocation), [geolocation]);

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
    geolocation,
    setGeolocation: setGeolocationState,
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
