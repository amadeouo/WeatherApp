import { Units } from "@/components/units/Units.tsx";

import logo from "@/app/assets/images/logo.svg";

export const Header = () => {
  return (
    <header className='flex justify-between'>
      <img
        className="sm:w-[120px] md:w-[200px]"
        src={logo}
        alt="logo"
        loading="lazy"
      />
      <Units />
    </header>
  )
}