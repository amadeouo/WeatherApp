type Props = {
  min: string,
  max: string,
  weekday: string,
  icon: string,
  iconAlt: string | undefined,
}

export const DailyWeatherOption = ({ min, max, weekday, iconAlt, icon }: Props) => {
  return (
    <div
      className="flex w-full items-center flex-col bg-neutral-700 rounded-md p-2 gap-1 lg:px-1 lg:py-2 xl:px-3 xl:py-2 lg:gap-0"
    >
      <p className='text-center xl:text-xl'>{weekday}</p>
      <img
        className={`${iconAlt === 'loading' ? "animate-spin" : ""} lg:w-[50px] xl:w-[70px]`}
        src={icon}
        alt={iconAlt}
        width="60"
        height="60"
        loading="lazy"
      />
      <div className='flex w-full justify-between pe-1.5 ps-1.5'>
        <p className='text-xs xl:text-base text-zinc-50'>{min}</p>
        <p className='text-xs xl:text-base text-zinc-300'>{max}</p>
      </div>
    </div>
  )
}