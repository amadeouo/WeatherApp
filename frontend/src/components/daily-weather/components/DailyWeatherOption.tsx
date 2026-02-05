type Props = {
  min: string,
  max: string,
  weekday: string,
  icon: string,
  iconAlt: string | undefined,
}
export const DailyWeatherOption = ({ min, max, weekday, iconAlt, icon }: Props) => {
  return (
    <div className='flex w-full items-center flex-col bg-neutral-700 rounded-xl p-2 gap-1'>
      <p className='text-center'>{weekday}</p>
      <img
        className={`${iconAlt === 'loading' ? "animate-spin" : ""}`}
        src={icon}
        alt={iconAlt}
        width="60"
        height="60"
        loading="lazy"
      />
      <div className='flex w-full justify-between pe-1.5 ps-1.5'>
        <p className='text-sm'>{min}</p>
        <p className='text-sm'>{max}</p>
      </div>
    </div>
  )
}