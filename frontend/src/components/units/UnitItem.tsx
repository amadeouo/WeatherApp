import { buttonVariants } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

type Props = {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
export const UnitItem = ({ label, isActive, onClick}: Props) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'xs' }),
        'justify-between w-[160px] text-white cursor-pointer hover:bg-neutral-600 hover:text-white',
        isActive && 'bg-neutral-600'
      )}
      onClick={onClick}
    >
      {label}
      <svg
        className=''
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="11"
        fill="none"
        viewBox="0 0 14 11"
      >
        <path
          fill={isActive ? "#fff" : "none"}
          d="M11.895 1.047c.136-.137.355-.137.464 0l.793.766c.11.136.11.355 0 .464L4.95 10.48a.315.315 0 0 1-.465 0L.82 6.844c-.11-.137-.11-.356 0-.465l.793-.793c.11-.11.328-.11.465 0l2.625 2.652 7.192-7.191Z"
        />
      </svg>
    </div>
  )
}