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
import loadingIcon from "@/app/assets/images/icon-loading.svg";
import { useShallow } from "zustand/react/shallow";
import {
  DailyWeatherOptionSkeleton
} from "@/components/daily-weather/components/DailyWeatherOptionSkeleton.tsx";

export const DailyWeather = () => {
  const {
    isLoading,
    getDailyForecast,
    dailyForecast
  } = useWeatherStore(useShallow(state => ( {
    getDailyForecast: state.getDailyForecast,
    dailyForecast: state.dailyForecast,
    isLoading: state.isLoading
  } )))

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
      <h3 className='mb-2 text-lg'>Daily forecast</h3>
      <div className='gap-2 sm:grid sm:grid-cols-3 image:grid-cols-4 lg:grid-cols-7'>
        {( isLoading || !days.length )
          ? Array.from({ length: 7 }).map((_, i) => (
            <DailyWeatherOptionSkeleton key={i} />
          ))
          : days.map((day) => {
            const weatherCodeLinkSrc = weatherCodeLink(day.weatherCode)
            return (
              <DailyWeatherOption
                min={formatTemperature(day.minTemp, temperature)}
                max={formatTemperature(day.maxTemp, temperature)}
                weekday={day.weekDay}
                icon={weatherCodeLinkSrc ? weatherCodeLinkSrc : loadingIcon}
                iconAlt={weatherCodeLinkSrc ? weatherAlt(weatherCodeLinkSrc) : "loading"}
                key={day.date.toISOString()}
              />
            )
          })
        }
        {}
      </div>
    </section>
  )
}