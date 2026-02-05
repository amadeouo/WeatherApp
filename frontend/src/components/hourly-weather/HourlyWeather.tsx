import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { useWeatherStore } from "@/store/useWeatherStore.ts";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { paramsHourly } from "@/utils/weatherParams.ts";
import { Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import { DAYS_CONFIG } from "@/components/hourly-weather/utils/daysConfig.ts";

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

  useEffect(() => {
    getHourlyForecast({
      ...paramsHourly,
      latitude: itemFromLocalStorage.latitude,
      longitude: itemFromLocalStorage.longitude,
    })
  }, [itemFromLocalStorage.latitude, itemFromLocalStorage.longitude, getHourlyForecast])

  console.log(hourlyForecast)
  console.log(day)

  return (
    <section className='col-start-3 col-end-4 row-start-1 row-end-3 h-full w-full'>
      <div className='w-full h-full bg-neutral-700 rounded-xl p-4'>
        <div className='flex justify-between items-center gap-20'>
          <h3 className='text-lg'>Hourly forecast</h3>
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
        <div>

        </div>
      </div>
    </section>
  )
}