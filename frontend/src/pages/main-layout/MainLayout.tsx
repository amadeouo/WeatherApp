import { Header } from "@/widgets/header/Header.tsx";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Hero } from "@/widgets/hero/Hero.tsx";
import { useEffect } from "react";
import { useGeolocationStore } from "@/store/useGeolocationStore.ts";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";
import { useShallow } from "zustand/react/shallow";

export const MainLayout = () => {
  const {items, setItemsFromLocation} = useGeolocationStore(useShallow(state => ({
    items: state.items,
    setItemsFromLocation: state.setItemsFromLocation,
    isLoading: state.isLoading,
    error: state.error,
  })))
  const {itemFromLocalStorage, setItemFromLocalStorage} = useLocalStorageContext()
  const navigate = useNavigate()
  const location = useLocation().pathname

  useEffect(() => {
    // Если мы на главной странице
    if (location === '/') {
      // Если есть сохраненный город в localStorage, переходим на него
      if (itemFromLocalStorage.name) {
        navigate(`/${itemFromLocalStorage.name.toLowerCase()}`);
      } else {
        // Иначе пытаемся определить местоположение
        setItemsFromLocation();
      }
    }
  }, [location, itemFromLocalStorage.name, navigate, setItemsFromLocation]);

  useEffect(() => {
    // Если геолокация определила город и мы все еще на главной (или если это новый город)
    if (items.name && location === '/') {
      navigate(`/${items.name.toLowerCase()}`);
      setItemFromLocalStorage(items);
    }
  }, [items, location, navigate, setItemFromLocalStorage]);

  return (
    <div className='flex justify-center h-full px-20 sm:px-4 py-4 md:px-15 lg:px-20 text-white'>
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