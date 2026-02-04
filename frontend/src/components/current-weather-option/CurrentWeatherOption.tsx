type Props = {
  label: string,
  data: string | number
}
export const CurrentWeatherOption = ({ label, data }: Props) => {
  return (
    <div className='flex w-full flex-col bg-neutral-700 p-6 rounded-xl gap-3'>
      <p className='text-zinc-400'>{label}</p>
      <p className='text-3xl'>{data}</p>
    </div>
  )
}