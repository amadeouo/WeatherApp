import {
  CurrentWeather
} from "@/components/current-weather/CurrentWeather.tsx";
import { DailyWeather } from "@/components/daily-weather/DailyWeather.tsx";
import { HourlyWeather } from "@/components/hourly-weather/HourlyWeather.tsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ErrorPage } from "@/pages/404/ErrorPage.tsx";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";

export const Weather = () => {
  const error = useWeatherStore(state => state.error)
  const [localError, setLocalError] = useState<boolean>(false)
  const locationPathname = useLocation().pathname.slice(1)
  const {itemFromLocalStorage} = useLocalStorageContext()

  useEffect(() => {
    if (locationPathname !== itemFromLocalStorage.name.toLowerCase() ) {
      setLocalError(true)
    } else {
      setLocalError(false)
    }
  }, [locationPathname, itemFromLocalStorage.name])

  if (error || localError) return (<ErrorPage />)

  return (
    <main className='sm:flex sm:flex-col mt-7 lg:grid lg:grid-cols-[1fr_auto] gap-x-4 h-auto'>
      <div className='flex flex-col gap-y-4'>
        <CurrentWeather />
        <DailyWeather />
      </div>
      <HourlyWeather />
    </main>
  )
}