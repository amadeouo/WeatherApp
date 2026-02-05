import { useMemo } from "react";
import type { THourlyForecast } from "@/types/types.ts";

export const useHourlyData = (hourlyForecast: THourlyForecast | null, selectedDay: string) => {
  return useMemo(() => {
    if (!hourlyForecast || !hourlyForecast.time || !hourlyForecast.temperature_2m || !hourlyForecast.weather_code) {
      return [];
    }

    const filteredData = [];

    for (let i = 0; i < hourlyForecast.time.length; i++) {
      const date = hourlyForecast.time[i];
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (dayOfWeek === selectedDay) {
        filteredData.push({
          time: date,
          temperature: hourlyForecast.temperature_2m[i],
          weatherCode: hourlyForecast.weather_code[i]
        });
      }
    }

    return filteredData;
  }, [hourlyForecast, selectedDay]);
};