import { Button } from "@/components/ui/button.tsx";

export const ErrorPage = () => {
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
      <h1 className='text-5xl'>Something went wrong</h1>
      <p className='text-sm text-zinc-400 w-100 text-center'>We couldn't connect to the server (API error). Please try again in a few moments</p>
      <Button>
        <img
          src="/images/icon-retry.svg"
          alt="retry button"
          width="15"
          height="15"
          loading="lazy"
        />
        <span>Retry</span>
      </Button>
    </div>
  )
}