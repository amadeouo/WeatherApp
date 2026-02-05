import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
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

export const HourlyWeather = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [day, setDay] = useState<string>(today)
  const { itemFromLocalStorage } = useLocalStorageContext()
  const {
    hourlyForecast,
    getHourlyForecast
  } = useWeatherStore(useShallow(state => ( {
    hourlyForecast: state.hourlyForecast,
    getHourlyForecast: state.getHourlyForecast,
  } )))

  const hourlyData = useHourlyData(hourlyForecast, day);

  useEffect(() => {
    getHourlyForecast({
      ...paramsHourly,
      latitude: itemFromLocalStorage.latitude,
      longitude: itemFromLocalStorage.longitude,
    })
  }, [itemFromLocalStorage.latitude, itemFromLocalStorage.longitude, getHourlyForecast])

  return (
    <section className='w-full h-full'>
      <div className='w-full h-auto bg-neutral-700 rounded-xl p-4'>
        <div className='flex justify-btween items-center gap-20'>
          <h3 className='text-lg'>Hourley forecast</h3>
          <Select
            defaultValue={today}
            value={day}
            onValueChange={setDay}
          >
            <SelectTrigger className="min-w-[140px] pl-4">
              <SelectValue
                placeholder="Day of week"
              />
            </SelectTrigger>
            <SelectContent className='border-none bg-neutral-700' position='popper'>
              <SelectGroup className=' text-white '>
                {DAYS_CONFIG.map((day) => (
                  <SelectItem
                    className='bg-neutral-700'
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
          <ScrollArea className='flex flex-col max-h-[calc(100vh-270px-16px)]'>
            <div className='flex flex-col gap-3'>
              {hourlyData.length > 7
                ? (
                  hourlyData.map((item, index) => {
                    const weatherCodeLinkSrc = weatherCodeLink(item.weatherCode)
                    return (
                      <HourlyWeatherOption
                        key={`${item.time}-${index}`}
                        time={item.time.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        temperature={Math.round(item.temperature)}
                        weatherCodeLink={weatherCodeLink(item.weatherCode)}
                        weatherCodeAlt={weatherAlt(weatherCodeLinkSrc)}
                      />
                  )})
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