import {
  CurrentWeather
} from "@/components/current-weather/CurrentWeather.tsx";
import { DailyWeather } from "@/components/daily-weather/DailyWeather.tsx";
import { HourlyWeather } from "@/components/hourly-weather/HourlyWeather.tsx";

export const Weather = () => {
  return (
    <main className='mt-7 grid grid-cols-[1fr_auto] gap-x-4 h-auto'>
      <div className='flex flex-col gap-y-4'>
        <CurrentWeather />
        <DailyWeather />
      </div>
      <HourlyWeather />
    </main>
  )
}