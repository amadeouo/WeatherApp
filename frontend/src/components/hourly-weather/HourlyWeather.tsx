import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState } from "react";
import { paramsHourly } from "@/utils/weatherParams.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import { DAYS_CONFIG } from "@/components/hourly-weather/utils/daysConfig.ts";
import { useHourlyData } from "@/utils/hooks/useHourlyData.ts";
import {
  HourlyWeatherOption
} from "@/components/hourly-weather/components/HourlyWeatherOption.tsx";
import { weatherAlt, weatherCodeLink } from "@/utils/weatherCode.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { formatTemperature } from "@/utils/formatTemperature.ts";
import { useUnitsStore } from "@/store/useUnitsStore.ts";
import {
  HourlyWeatherSkeleton
} from "@/components/hourly-weather/components/HourlyWeatherSkeleton.tsx";

export const HourlyWeather = () => {
  const today = new Date()
  const todayDate = today.toLocaleDateString('en-US', { weekday: 'long' });
  const [day, setDay] = useState<string>(todayDate)
  const isToday = day === todayDate

  const { itemFromLocalStorage } = useLocalStorageContext()
  const { hourlyForecast, getHourlyForecast, isLoading, } = useWeatherStore(useShallow(state => ( {
    hourlyForecast: state.hourlyForecast,
    getHourlyForecast: state.getHourlyForecast,
    isLoading: state.isLoading,
  } )))

  const targetRef = useRef<HTMLDivElement>(null)

  const temperature = useUnitsStore(state => state.temperature)
  const hourlyData = useHourlyData(hourlyForecast, day);

  useEffect(() => {
    getHourlyForecast({
      ...paramsHourly,
      latitude: itemFromLocalStorage.latitude,
      longitude: itemFromLocalStorage.longitude,
    })
  }, [itemFromLocalStorage.latitude, itemFromLocalStorage.longitude, getHourlyForecast])


  useEffect(() => {
    if (!isLoading && hourlyData.length > 0 && isToday) {
      const timer = setTimeout(() => {
        const viewport = targetRef.current?.closest('[data-radix-scroll-area-viewport]')

        if (viewport) {
          const offsetTop = targetRef.current?.offsetTop;
          viewport.scrollTo({
            top: offsetTop,
            behavior: "instant",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading, hourlyData.length, isToday]);

  return (
    <section className='w-full h-full sm:mt-4 lg:mt-0'>
      <div className='w-full h-auto bg-neutral-700 rounded-xl p-4'>
        <div className='flex justify-between items-center lg:gap-20'>
          <h3 className='text-lg sm:text-base md:text-lg lg:text-base'>Hourly forecast</h3>

          {/* Селект */}
          <Select
            defaultValue={todayDate}
            value={day}
            onValueChange={setDay}
          >
            <SelectTrigger
              className="min-w-[140px] pl-4 sm:text-sm border-none bg-neutral-600
               hover:bg-zinc-500 focus:outline-1 cursor-pointer"
            >
              <SelectValue
                placeholder="Day of week"
              />
            </SelectTrigger>
            <SelectContent className='border-none bg-neutral-700' position='popper'>
              <SelectGroup className=' text-white '>
                {DAYS_CONFIG.map((day) => (
                  <SelectItem
                    className='bg-neutral-700'
                    style={{  }}
                    value={day.weekDay}
                    key={day.id}
                  >
                    {day.weekDay}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='mt-4'>
          <ScrollArea className='flex flex-col max-h-[calc(100vh-328px)]'>
            <div className='flex flex-col gap-3'>
              {/* Элемент часовой погоды */}
              {(isLoading || hourlyData.length === 0)
                ? Array.from({length: 23}).map((_, i) => (
                  <HourlyWeatherSkeleton key={i} />
                ))
                : (hourlyData.length > 7 && hourlyData.length !== 0)
                  ? hourlyData.map((item, index) => {
                    const weatherCodeLinkSrc = weatherCodeLink(item.weatherCode)
                    return (
                      <HourlyWeatherOption
                        key={`${item.time}-${index}`}
                        time={item.time.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        ref={
                        (( item.time.getHours() === today.getHours()) && (item.time.getDate() === today.getDate()))
                          ? targetRef
                          : null
                        }
                        temperature={formatTemperature(Math.round(item.temperature), temperature)}
                        weatherCodeLink={weatherCodeLink(item.weatherCode)}
                        weatherCodeAlt={weatherAlt(weatherCodeLinkSrc)}
                      />
                    )}
                  )
                  : (<span className='p-2 text-center'>Weather on this day is not available</span>)
              }
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}