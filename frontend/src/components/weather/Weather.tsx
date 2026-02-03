import { useWeatherStore } from "@/store/useWeatherStore.ts";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";



const paramsCurrent = {
  latitude: 55.7522,
  longitude: 37.6156,
  current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "weather_code", "wind_speed_10m"],
  timezone: "auto",
};

const paramsDaily = {
  latitude: 55.7522,
  longitude: 37.6156,
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
  timezone: "auto",
};

const paramsHourly = {
  latitude: 55.7522,
  longitude: 37.6156,
  hourly: ["temperature_2m", "weather_code"],
  timezone: "auto",
  forecast_days: 1,
};


export const Weather = () => {
  const {
    currentForecast,
    hourlyForecast,
    dailyForecast,
    isLoading,
    error,
    getCurrentWeather,
    getDailyForecast,
    getHourlyForecast,
  } = useWeatherStore(useShallow(state => ( {
    currentForecast: state.currentForecast,
    hourlyForecast: state.hourlyForecast,
    dailyForecast: state.dailyForecast,
    isLoading: state.isLoading,
    error: state.error,
    getCurrentWeather: state.getCurrentWeather,
    getDailyForecast: state.getDailyForecast,
    getHourlyForecast: state.getHourlyForecast,
  } )))

  useEffect(() => {
    getCurrentWeather(paramsCurrent)
    getDailyForecast(paramsDaily)
    getHourlyForecast(paramsHourly)
  }, [getCurrentWeather, getDailyForecast, getHourlyForecast])

  console.log(hourlyForecast)
  return (
    <div className=''>
      Search
    </div>
  )
}