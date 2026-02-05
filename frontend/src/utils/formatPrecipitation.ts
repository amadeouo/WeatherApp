export const formatPrecipitation = (prec: number | string | undefined, storeValue: 'mm' | 'in') => {
  if (prec === undefined) return ''
  const precNumber = Number(prec)

  return storeValue === 'mm' ? `${Math.round(precNumber)} mm` : `${Math.round(precNumber / 25.4)} in`
}