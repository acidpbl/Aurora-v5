import { useEffect, useState } from "react";

export const useWeather = () => {
  const [location, setLocation] = useState<null | string>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`lat:${latitude},lon:${longitude}`);
        },
        (error) => {
          console.error("Error obtaining location:", error);
          setLocation("auto");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation("auto");
    }
  }, []);

  return { location };
};
