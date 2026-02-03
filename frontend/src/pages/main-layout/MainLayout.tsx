import { Header } from "@/widgets/header/Header.tsx";
import { Outlet } from "react-router";
import { Hero } from "@/widgets/hero/Hero.tsx";

export const MainLayout = () => {
  return (
    <div className='flex justify-center h-screen bg-blue-950 px-20 py-4  text-white'>
      <div className='w-full max-w-[1440px] '>
        <Header />
        <Hero />
        <Outlet />
      </div>
    </div>
  )
}