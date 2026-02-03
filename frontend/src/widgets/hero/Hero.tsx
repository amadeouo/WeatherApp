import { Search } from "@/components/search/Search.tsx";

export const Hero = () => {
  return (
    <div className='flex items-center flex-col mt-10 gap-4'>
      <h1 className='text-center w-full text-4xl'>How's the sky looking today</h1>
      <Search />
    </div>
  )
}