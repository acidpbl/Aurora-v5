import { useEffect } from "react";
import { useSettings } from "../context/SettingsContext";

export function useGeolocation() {
  const { setGeolocation } = useSettings();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
          setGeolocation(coords);
        },
        (err) => {
          console.warn("Geolocation denied:", err.message);
          setGeolocation("Permission denied");
        }
      );
    } else {
      setGeolocation("Not supported");
    }
  }, [setGeolocation]);
}
