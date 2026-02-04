export type TCurrentForecast = {
  apparent_temperature: number
  precipitation: number
  relative_humidity_2m: number
  temperature_2m: number
  time: Date;
  weather_code: number;
  wind_speed_10m: number;
}

export type TCurrentForecastParams = {
  latitude: number
  longitude: number
  current: string[]
  timezone: string,
}

export type TDailyForecast = {
  time: Date[]
  temperature_2m_max: Float32Array<ArrayBufferLike> | null
  temperature_2m_min: Float32Array<ArrayBufferLike> | null
  weather_code: Float32Array<ArrayBufferLike> | null
}

export type TDailyForecastParams = {
  latitude: number
  longitude: number
  daily: string[]
  timezone: string,
}

export type THourlyForecast = {
  temperature_2m: Float32Array<ArrayBufferLike> | null
  time: Date[]
  weather_code: Float32Array<ArrayBufferLike> | null
}

export type THourlyForecastParams = {
  latitude: number
  longitude: number
  hourly: string[]
  timezone: string,
}

export type TLocation = {
  latitude: number
  longitude: number
}

export type TCity = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export type TItems = {
  name: string,
  latitude: number,
  longitude: number,
}