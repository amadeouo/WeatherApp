import { useEffect } from "react";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { transformData } from "@/utils/transformData.ts";
import { weatherAlt, weatherCodeLink } from "@/utils/weatherCode.ts";
import {
  CurrentWeatherOption
} from "@/components/current-weather/components/CurrentWeatherOption.tsx";
import { useShallow } from "zustand/react/shallow";
import { paramsCurrent } from "@/utils/weatherParams.ts";
import { formatWindSpeed } from "@/utils/formatWindSpeed.ts";
import { formatPrecipitation } from "@/utils/formatPrecipitation.ts";
import { useUnitsStore } from "@/store/useUnitsStore.ts";
import { formatTemperature } from "@/utils/formatTemperature.ts";

import loadingIcon from "@/app/assets/images/icon-loading.svg";
import { CurrentWeatherImageSkeleton } from "@/components/current-weather/components/CurrentWeatherImageSkeleton.tsx";

export const CurrentWeather = () => {
  const {
    getCurrentWeather,
    currentForecast,
    isLoading
  } = useWeatherStore(useShallow(state => ( {
    isLoading: state.isLoading,
    getCurrentWeather: state.getCurrentWeather,
    currentForecast: state.currentForecast,
  })))
  const { temperature, precipitation, windSpeed } = useUnitsStore(useShallow(state => ( {
    temperature: state.temperature,
    precipitation: state.precipitation,
    windSpeed: state.windSpeed,
  } )))
  const { itemFromLocalStorage } = useLocalStorageContext()

  const weatherOptions = [
    {
      id: 1,
      label: 'Feels like',
      data: formatTemperature(currentForecast?.apparent_temperature.toFixed(0), temperature),
    },
    {
      id: 2,
      label: 'Humidity',
      data: `${currentForecast?.relative_humidity_2m}%`,
    },
    {
      id: 3,
      label: 'Wind',
      data: formatWindSpeed(currentForecast?.wind_speed_10m.toFixed(0), windSpeed),
    },
    {
      id: 4,
      label: 'Precipitation',
      data: formatPrecipitation(currentForecast?.precipitation.toFixed(0), precipitation),
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
    <section className='h-auto'>
      {isLoading
        ? ( <CurrentWeatherImageSkeleton /> )
        : (
          <div
            className={`
            relative min-h-[260px] rounded-xl flex items-center px-4 justify-between
            bg-center bg-cover
            sm:flex-col sm:gap-9 sm:justify-center
            bg-[image:var(--bg-today-small)]
            image:bg-[image:var(--bg-today-large)]
            image:flex-row image:justify-between
            xl:px-7
          `}
          >
            <div className='flex flex-col z-1 sm:gap-2'>
              <h3 className='sm:text-3xl sm:text-center image:text-left image:text-3xl lg:text-5xl xl:text-6xl'>{itemFromLocalStorage.name}</h3>
              <p className='text-lg sm:text-sm sm:text-neutral-300 image:text-md lg:text-xl xl:text-2xl'>{transformData(currentForecast?.time)}</p>
            </div>
            <div className='flex items-center gap-7 z-2 sm:gap-2  image:gap-7'>
              <img
                className={`${weatherCodeLinkSrc ? "" : "animate-spin"} h-[80px] w-[80px] xl:w-[100px] xl:h-[100px]`}
                src={weatherCodeLinkSrc ? weatherCodeLinkSrc : loadingIcon}
                alt={weatherCodeLinkSrc ? weatherAlt(weatherCodeLinkSrc) : "loading"}
                loading="lazy"
              />
              <p className='text-7xl sm:text-7xl italic'>{currentForecast?.temperature_2m.toFixed(0)}°</p>
            </div>
          </div>
        )
      }

      <div className='gap-5 mt-5 sm:grid sm:grid-cols-2 sm:gap-3 md:grid-cols-4'>
        {
          weatherOptions.map((option) => {
            if (!option.data || isLoading) {
              return (
                <CurrentWeatherOption
                  label={option.label}
                  data='-'
                  key={option.id + 10}
                  isLoading={true}
                />
              )
            }
            return (
              <CurrentWeatherOption
                label={option.label}
                data={option.data}
                key={option.id}
              />
            )
          })
        }
      </div>
    </section>
  )
}