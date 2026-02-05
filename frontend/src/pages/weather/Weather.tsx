import {
  CurrentWeather
} from "@/components/current-weather/CurrentWeather.tsx";
import { DailyWeather } from "@/components/daily-weather/DailyWeather.tsx";
import { HourlyWeather } from "@/components/hourly-weather/HourlyWeather.tsx";

export const Weather = () => {
  return (
    <main className='mt-7 grid grid-cols-2 grid-rows-2 gap-x-4'>
      <CurrentWeather />
      <DailyWeather />
      <HourlyWeather />
    </main>
  )
}