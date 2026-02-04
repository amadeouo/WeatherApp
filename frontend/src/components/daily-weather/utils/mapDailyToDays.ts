import type { TDailyForecast } from "@/types/types.ts";

export const mapDailyToDays = (data: TDailyForecast | null) => {
  if (!data?.time || !data?.weather_code || !data?.temperature_2m_min || !data?.temperature_2m_max ) return []

  const weatherCode = Array.from(data.weather_code)
  const minTemp = Array.from(data.temperature_2m_min)
  const maxTemp = Array.from(data.temperature_2m_max)

  return data.time.map((date, index) => ({
    date,
    weatherCode: weatherCode[index],
    minTemp: minTemp[index].toFixed(0),
    maxTemp: maxTemp[index].toFixed(0),
    weekDay: date.toLocaleDateString('en-US', { weekday: 'short' }),
  }))
}