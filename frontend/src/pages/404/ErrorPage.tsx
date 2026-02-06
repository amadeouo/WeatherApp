import { Button } from "@/components/ui/button.tsx";
import { Home } from "lucide-react";
import { useNavigate } from "react-router";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-4 mt-10'>
      <img
        className=''
        src="/images/icon-error.svg"
        alt="error image"
        width="50"
        height="50"
        loading="lazy"
      />
      <h1 className='sm:text-2xl md:text-5xl'>Something went wrong</h1>
      <p className='text-sm text-zinc-400 sm:w-80 md:w-100 text-center'>We couldn't connect to the server (API error). Please try again in a few moments</p>
      <div className='flex gap-2 sm:flex-col image:flex-row'>
        <Button onClick={() => window.location.reload()}>
          <img
            src="/images/icon-retry.svg"
            alt="retry button"
            width="15"
            height="15"
            loading="lazy"
          />
          <span>Retry</span>
        </Button>
        <Button onClick={() => navigate('/')}>
          <Home />
          <span>Home</span>
        </Button>
      </div>
    </div>
  )
}