import { Header } from "@/widgets/header/Header.tsx";
import { Outlet } from "react-router";
import { Hero } from "@/widgets/hero/Hero.tsx";
import { useEffect } from "react";
import { useGeolocationStore } from "@/store/useGeolocationStore.ts";

export const MainLayout = () => {
  const getLocation = useGeolocationStore(state => state.getLocation)

  useEffect(() => {
    getLocation()
  }, [getLocation])

  return (
    <div className='flex justify-center h-screen bg-[#03012DFF] px-20 py-4 text-white'>
      <div className='w-full max-w-[1440px] '>
        <Header />
        <Hero />
        <Outlet />
      </div>
    </div>
  )
}