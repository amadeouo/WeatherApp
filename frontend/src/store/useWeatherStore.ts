import { create } from "zustand/react";
import { fetchWeatherApi } from "openmeteo";
import type {
  TCurrentForecast, TCurrentForecastParams,
  TDailyForecast, TDailyForecastParams,
  THourlyForecast, THourlyForecastParams
} from "@/types/types.ts";

export interface WeatherStore {
  currentForecast: TCurrentForecast | null,
  hourlyForecast: THourlyForecast | null,
  dailyForecast: TDailyForecast | null,
  isLoading: boolean,
  error: string | null,
  getCurrentWeather: (params: TCurrentForecastParams) => void,
  getDailyForecast: (params: TDailyForecastParams) => void,
  getHourlyForecast: (params: THourlyForecastParams) => void,
}

const url = "https://api.open-meteo.com/v1/forecast";

export const useWeatherStore = create<WeatherStore>((set) => ({
  currentForecast: null,
  hourlyForecast: null,
  dailyForecast: null,
  isLoading: false,
  error: null,

  getCurrentWeather: async (params) => {
    set({ isLoading: true })
    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const current = response.current()!;
      set({
        currentForecast: {
          time: new Date((Number(current.time()) + response.utcOffsetSeconds()) * 1000),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          apparent_temperature: current.variables(2)!.value(),
          precipitation: current.variables(3)!.value(),
          weather_code: current.variables(4)!.value(),
          wind_speed_10m: current.variables(5)!.value(),
        },
      })
    } catch (e: any) {
      set({ error: (e as Error).message })
    } finally {
      set({ isLoading: false })
    }
  },
  getDailyForecast: async (params) => {
    set({ isLoading: true })
    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const daily = response.daily()
      if (!daily) return
      set({
        dailyForecast: {
          time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + response.utcOffsetSeconds()) * 1000)
          ),
          weather_code: daily.variables(0)!.valuesArray(),
          temperature_2m_max: daily.variables(1)!.valuesArray(),
          temperature_2m_min: daily.variables(2)!.valuesArray(),
        }
      })
    } catch (e: any) {
      set({ error: (e as Error).message })
    } finally {
      set({ isLoading: false})
    }
    },
  getHourlyForecast: async (params) => {
    set({ isLoading: true })
    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const hourly = response.hourly()
      if (!hourly) return
      set({
        hourlyForecast: {
          time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
            (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + response.utcOffsetSeconds()) * 1000)
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          weather_code: hourly.variables(1)!.valuesArray(),
        }
      })
    } catch (e: any) {
      set({ error: (e as Error).message })
    } finally {
      set({ isLoading: false})
    }
  }
}))