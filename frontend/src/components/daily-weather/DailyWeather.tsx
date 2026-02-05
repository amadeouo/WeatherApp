import { useWeatherStore } from "@/store/useWeatherStore.ts";
import { useEffect, useMemo } from "react";
import {
  DailyWeatherOption
} from "@/components/daily-weather/components/DailyWeatherOption.tsx";
import { weatherAlt, weatherCodeLink } from "@/utils/weatherCode.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import {
  mapDailyToDays
} from "@/components/daily-weather/utils/mapDailyToDays.ts";
import { paramsDaily } from "@/utils/weatherParams.ts";

export const DailyWeather = () => {
  const getDailyForecast = useWeatherStore(state => state.getDailyForecast)
  const dailyForecast = useWeatherStore(state => state.dailyForecast)
  const days = useMemo(() => {
    return mapDailyToDays(dailyForecast)
  }, [dailyForecast])
  const { itemFromLocalStorage } = useLocalStorageContext()

  useEffect(() => {
    getDailyForecast({
      ...paramsDaily,
      latitude: itemFromLocalStorage.latitude,
      longitude: itemFromLocalStorage.longitude,
    })
  }, [getDailyForecast, itemFromLocalStorage.latitude, itemFromLocalStorage.longitude])

  return (
    <section className='mt-6 col-start-1 col-end-3 row-start-2 row-end-3'>
      <h3 className='mb-2'>Daily forecast</h3>
      <div className='flex justify-stretch gap-2'>
        {days.map((day) => {
          const weatherCodeLinkSrc = weatherCodeLink(day.weatherCode)
          return (
            <DailyWeatherOption
              min={day.minTemp}
              max={day.maxTemp}
              weekday={day.weekDay}
              icon={weatherCodeLinkSrc ? weatherCodeLinkSrc : "/images/icon-loading.svg"}
              iconAlt={weatherCodeLinkSrc ? weatherAlt(weatherCodeLinkSrc) : "loading"}
              key={day.date.toISOString()}
            />
          )
        })}
      </div>
    </section>
  )
}