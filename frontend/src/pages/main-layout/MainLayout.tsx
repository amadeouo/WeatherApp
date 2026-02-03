import { Header } from "@/widgets/header/Header.tsx";
import { Outlet } from "react-router";
import { Hero } from "@/widgets/hero/Hero.tsx";

export const MainLayout = () => {
  return (
    <div className='h-screen bg-blue-950 px-20 py-4 max-w-[1440px] text-white'>
      <Header />
      <Hero />
      <Outlet />
    </div>
  )
}