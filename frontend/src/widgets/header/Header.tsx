import { Units } from "@/components/units/Units.tsx";

export const Header = () => {
  return (
    <header className='flex justify-between'>
      <img
        className={""}
        src="/images/logo.svg"
        alt="logo"
        loading="lazy"
      />
      <Units />
    </header>
  )
}