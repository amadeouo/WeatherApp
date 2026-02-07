import loadingIcon from "@/app/assets/images/icon-loading.svg";
import type { Ref } from "react";

type Props = {
  time: string,
  temperature: string,
  weatherCodeLink: string,
  weatherCodeAlt: string | undefined,
  ref: Ref<HTMLDivElement> | null
}
export const HourlyWeatherOption = ({ time, temperature, weatherCodeLink, weatherCodeAlt, ref }: Props) => {
  return (
    <div
      className='flex justify-between items-center bg-neutral-600 rounded-md px-2 py-1'
      ref={ref}
    >
      <div className='flex items-center gap-2'>
        <img
          className={`${weatherCodeLink ? "" : "animate-spin"}`}
          src={weatherCodeLink ? weatherCodeLink : loadingIcon}
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