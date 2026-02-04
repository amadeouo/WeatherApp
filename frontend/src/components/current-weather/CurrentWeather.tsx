import type { TCurrentForecastParams } from "@/types/types.ts";
import { useEffect } from "react";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { transformData } from "@/utils/transformData.ts";
import { weatherAlt, weatherCodeLink } from "@/utils/weatherCode.ts";
import {
  CurrentWeatherOption
} from "@/components/current-weather-option/CurrentWeatherOption.tsx";

type Props = {
  params: TCurrentForecastParams
}

export const CurrentWeather = ({ params }: Props) => {
  const { getCurrentWeather, currentForecast } = useWeatherStore()
  const { itemFromLocalStorage } = useLocalStorageContext()

  const weatherOptions = [
    {
      label: 'Feels like',
      data: `${currentForecast?.apparent_temperature.toFixed(0)}°`,
    },
    {
      label: 'Humidity',
      data: `${currentForecast?.relative_humidity_2m}%`,
    },
    {
      label: 'Wind',
      data: `${currentForecast?.wind_speed_10m.toFixed(0)} m/s`,
    },
    {
      label: 'Precipitation',
      data: `${currentForecast?.precipitation.toFixed(0)} mm`,
    }
  ]

  useEffect(() => {
    getCurrentWeather(params)
  }, [getCurrentWeather, params])

  const weatherCodeLinkSrc = weatherCodeLink(currentForecast?.weather_code)

  return (
    <section className='col-start-1 col-end-4 row-start-1 row-end-3'>
      <div className='w-[800px] h-[286px] rounded-xl flex items-center px-4 justify-between bg-[url("/images/bg-today-large.svg")]'>
        <div className=''>
          <h3 className='text-4xl'>{itemFromLocalStorage.name}</h3>
          <p className='text-lg'>{transformData(currentForecast?.time)}</p>
        </div>
        <div className='flex gap-7'>
          <img
            className={`${!currentForecast?.weather_code ? "animate-spin" : ""} h-full`}
            src={currentForecast?.weather_code ? weatherCodeLinkSrc : "/images/icon-loading.svg"}
            alt={currentForecast?.weather_code ? weatherAlt(weatherCodeLinkSrc) : "loading"}
            width="80"
            height="80"
            loading="lazy"
          />
          <p className='text-7xl'>{currentForecast?.temperature_2m.toFixed(0)}°</p>
        </div>
      </div>
      <div className='flex justify-stretch gap-5 mt-5'>
        {weatherOptions.map((option, index) => {
          if (!option.data) return
          return (
            <CurrentWeatherOption
              label={option.label}
              data={option.data}
              key={`${option}-${index}`}
            />
          )
        })}
      </div>
    </section>
  )
}