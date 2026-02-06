import { Search } from "@/components/search/Search.tsx";

export const Hero = () => {
  return (
    <div className='flex items-center flex-col mt-2 gap-4'>
      <h1 className='text-center w-full text-4xl sm:5xl sm:py-8 image:py-2 md:text-5xl'>How's the sky looking today?</h1>
      <Search />
    </div>
  )
}