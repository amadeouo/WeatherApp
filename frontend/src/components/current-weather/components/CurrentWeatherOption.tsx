type Props = {
  label: string,
  data: string | number
}
export const CurrentWeatherOption = ({ label, data }: Props) => {
  return (
    <div
      className='
        flex flex-col bg-neutral-700 p-6 rounded-xl gap-3
        sm:p-3 sm:gap-1 sm:rounded-md
        md:gap-3.5
      '
    >
      <p className='text-zinc-400 sm:text-sm md:text-base'>{label}</p>
      <p className='text-3xl sm:text-sm md:text-2xl'>{data}</p>
    </div>
  )
}