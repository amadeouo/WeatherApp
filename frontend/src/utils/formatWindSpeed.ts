export const formatWindSpeed = (windSpeedRaw: number | string | undefined, storeValue: 'kmh' | 'mph') => {
  if (windSpeedRaw === undefined) return ''
  const windSpeedNumber = Number(windSpeedRaw)

  return storeValue === 'kmh' ? `${Math.round(windSpeedNumber)} km/h` : `${Math.round(windSpeedNumber / 1.609)} mph`;
}