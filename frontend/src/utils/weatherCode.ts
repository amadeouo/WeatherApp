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
  ["images/icon-sunny.webp", [0]],
  ["images/icon-partly-cloudy.webp", [1, 2]],
  ["images/icon-overcast.webp", [3]],
  ["images/icon-fog.webp", [45, 48]],
  ["images/icon-drizzle.webp", [51, 53, 55, 56, 57]],
  ["images/icon-rain.webp", [61, 63, 65, 66, 67, 80, 81, 82]],
  ["images/icon-snow.webp", [71, 73, 75, 77, 85, 86]],
  ["images/icon-storm.webp", [95, 96, 99]],
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