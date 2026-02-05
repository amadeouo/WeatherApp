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
import { formatTemperature } from "@/utils/formatTemperature.ts";
import { useUnitsStore } from "@/store/useUnitsStore.ts";

export const DailyWeather = () => {
  const getDailyForecast = useWeatherStore(state => state.getDailyForecast)
  const dailyForecast = useWeatherStore(state => state.dailyForecast)
  const temperature = useUnitsStore(state => state.temperature)
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
    <section className='mt-2 h-auto'>
      <h3 className='mb-2'>Daily forecast</h3>
      <div className='flex justify-stretch gap-2'>
        {days.map((day) => {
          const weatherCodeLinkSrc = weatherCodeLink(day.weatherCode)
          return (
            <DailyWeatherOption
              min={formatTemperature(day.minTemp, temperature)}
              max={formatTemperature(day.maxTemp, temperature)}
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