/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { setCookie, getCookie } from "./cookieUtils";

type Theme = "light" | "dark";
type Language = string;

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
  timeFormat: string;
  setTimeFormat: (format: string) => void;
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie("theme", theme);
  }, [theme]);

  useEffect(() => {
    setCookie("language", language);
  }, [language]);

  const setTheme = (theme: Theme) => setThemeState(theme);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  const setLanguage = (lang: Language) => setLanguageState(lang);

  const value: SettingsContextProps = {
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage,
    timezone: "UTC",
    setTimezone: () => {},
    dateFormat: "MM/DD/YYYY",
    setDateFormat: () => {},
    timeFormat: "ampm",
    setTimeFormat: () => {},
    geolocation: "",
    setGeolocation: () => {},
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
