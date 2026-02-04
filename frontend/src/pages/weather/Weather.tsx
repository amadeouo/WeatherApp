import {
  CurrentWeather
} from "@/components/current-weather/CurrentWeather.tsx";
import { DailyWeather } from "@/components/daily-weather/DailyWeather.tsx";
import { HourlyWeather } from "@/components/hourly-weather/HourlyWeather.tsx";

export const paramsCurrent = {
  latitude: 55.7522,
  longitude: 37.6156,
  current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "weather_code", "wind_speed_10m"],
  timezone: "auto",
};

export const paramsDaily = {
  latitude: 55.7522,
  longitude: 37.6156,
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
  timezone: "auto",
};

export const paramsHourly = {
  latitude: 55.7522,
  longitude: 37.6156,
  hourly: ["temperature_2m", "weather_code"],
  timezone: "auto",
  forecast_days: 1,
};


export const Weather = () => {
  return (
    <main className='mt-7 grid grid-cols-4 grid-rows-3'>
      <CurrentWeather />
      <DailyWeather />
      <HourlyWeather />
    </main>
  )
}