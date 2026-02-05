export const formatTemperature = (temp: number | string | undefined, storeValue: 'celsius' | 'fahrenheit') => {
  if (temp === undefined) return ''
  const tempNumber = Number(temp);

  return storeValue === 'celsius' ? `${Math.round(tempNumber)}°` : `${Math.round((tempNumber * 1.8) + 32)}°`
}