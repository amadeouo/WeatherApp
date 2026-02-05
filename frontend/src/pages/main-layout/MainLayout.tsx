import { Header } from "@/widgets/header/Header.tsx";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Hero } from "@/widgets/hero/Hero.tsx";
import { useEffect } from "react";
import { useGeolocationStore } from "@/store/useGeolocationStore.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";

export const MainLayout = () => {
  const getLocation = useGeolocationStore(state => state.getLocation)
  const {itemFromLocalStorage} = useLocalStorageContext()
  const navigate = useNavigate()
  const location = useLocation().pathname

  useEffect(() => {
    getLocation()
    if (itemFromLocalStorage.name && location === '/') {
      navigate(`/${itemFromLocalStorage.name}`)
    }
  }, [getLocation, navigate, itemFromLocalStorage.name])

  return (
    <div className='flex justify-center h-full px-20 py-4 text-white'>
      <div className='w-full max-w-[1440px]'>
        <Header />
        <Hero />
        <Outlet />
        {!itemFromLocalStorage.name && (
          <p className='text-center mt-5 text-2xl text-zinc-400'>Please choose the city</p>
        )}
      </div>
    </div>
  )
}