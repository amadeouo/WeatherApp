import loadingIcon from "@/app/assets/images/icon-loading.svg";

export const CurrentWeatherImageSkeleton = () => {
  return (
    <div className='flex items-center justify-center relative min-h-[286px] animate-pulse w-full bg-neutral-700 rounded-xl'>
      <div className='flex flex-col gap-4'>
        <img
          className='animate-spin'
          src={loadingIcon}
          alt="loading image"
          width="60"
          height="60"
          loading="lazy"
        />
        <span>Loading</span>
      </div>
    </div>
  )
}