import { useEffect } from "react";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { transformData } from "@/utils/transformData.ts";
import { weatherAlt, weatherCodeLink } from "@/utils/weatherCode.ts";
import { CurrentWeatherOption } from "@/components/current-weather/components/CurrentWeatherOption.tsx";
import { useShallow } from "zustand/react/shallow";
import { paramsCurrent } from "@/utils/weatherParams.ts";

export const CurrentWeather = () => {
  const { getCurrentWeather, currentForecast } = useWeatherStore(useShallow(state => ({
    getCurrentWeather: state.getCurrentWeather,
    currentForecast: state.currentForecast,
  })))
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
    getCurrentWeather({
      ...paramsCurrent,
      latitude: itemFromLocalStorage.latitude,
      longitude: itemFromLocalStorage.longitude
    })
  }, [getCurrentWeather, itemFromLocalStorage.latitude, itemFromLocalStorage.longitude])

  const weatherCodeLinkSrc = weatherCodeLink(currentForecast?.weather_code)

  return (
    <section className='col-start-1 col-end-3 row-start-1 row-end-2'>
      <div className='relative min-h-[286px] rounded-xl flex items-center px-4 justify-between bg-[url("/images/bg-today-large.svg")] bg-center bg-cover'>
        <div className='z-1'>
          <h3 className='text-4xl'>{itemFromLocalStorage.name}</h3>
          <p className='text-lg'>{transformData(currentForecast?.time)}</p>
        </div>
        <div className='flex gap-7 z-2'>
          <img
            className={`${weatherCodeLinkSrc ? "" : "animate-spin"} h-[80px] w-[80px]`}
            src={weatherCodeLinkSrc ? weatherCodeLinkSrc : "/images/icon-loading.svg"}
            alt={weatherCodeLinkSrc ? weatherAlt(weatherCodeLinkSrc) : "loading"}
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