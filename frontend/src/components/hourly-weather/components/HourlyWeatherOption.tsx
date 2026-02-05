type Props = {
  time: string,
  temperature: string,
  weatherCodeLink: string,
  weatherCodeAlt: string | undefined,
}
export const HourlyWeatherOption = ({ time, temperature, weatherCodeLink, weatherCodeAlt }: Props) => {
  return (
    <div className='flex justify-between items-center bg-neutral-600 rounded-md px-2 py-1 '>
      <div className='flex items-center gap-2'>
        <img
          className={`${weatherCodeLink ? "" : "animate-spin"}`}
          src={weatherCodeLink ? weatherCodeLink : "/images/icon-loading.svg"}
          alt={weatherCodeAlt ? weatherCodeAlt : "loading"}
          width="50"
          height="50"
          loading="lazy"
        />
        <span>{time}</span>
      </div>
      <span>{temperature}</span>
    </div>
  )
}