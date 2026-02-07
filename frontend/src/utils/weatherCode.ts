import sunny from "@/app/assets/images/icon-sunny.webp";
import partlyCloudy from "@/app/assets/images/icon-partly-cloudy.webp";
import overcast from "@/app/assets/images/icon-overcast.webp";
import fog from "@/app/assets/images/icon-fog.webp";
import drizzle from "@/app/assets/images/icon-drizzle.webp";
import rain from "@/app/assets/images/icon-rain.webp";
import snow from "@/app/assets/images/icon-snow.webp";
import storm from "@/app/assets/images/icon-storm.webp";

// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
const WEATHER_CODE_CONFIG = new Map([
  [sunny, [0]],
  [partlyCloudy, [1, 2]],
  [overcast, [3]],
  [fog, [45, 48]],
  [drizzle, [51, 53, 55, 56, 57]],
  [rain, [61, 63, 65, 66, 67, 80, 81, 82]],
  [snow, [71, 73, 75, 77, 85, 86]],
  [storm, [95, 96, 99]],
])

export const weatherCodeLink = (weatherCode: number | undefined): string => {
  if (weatherCode === undefined) return ''
  let result: string = ''
  WEATHER_CODE_CONFIG.forEach((value, key) => {
    if (value.includes(weatherCode)) result = key
  })
  return result
}

export const weatherAlt = (weatherCodeLink: string) => {
  return weatherCodeLink.split('-').at(-1)?.split('.').at(0)
}