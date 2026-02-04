export const paramsCurrent = {
  latitude: 55.7522,
  longitude: 37.6156,
  current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "weather_code", "wind_speed_10m"],
  timezone: "auto",
};

export const paramsDaily = {
  latitude: 55.7522,
  longitude: 37.6156,
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
  timezone: "auto",
};

export const paramsHourly = {
  latitude: 55.7522,
  longitude: 37.6156,
  hourly: ["temperature_2m", "weather_code"],
  timezone: "auto",
  past_days: 3,
  forecast_days: 3,
};