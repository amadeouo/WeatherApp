export function transformData(date: Date | undefined) {
  if (!date) return ''

  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const year = date.getFullYear()

  return `${dayOfWeek}, ${month} ${day}, ${year}`
}