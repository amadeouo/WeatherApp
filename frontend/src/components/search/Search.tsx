import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover.tsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command.tsx";
import { useSearchStore } from "@/store/useSearchStore.ts";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import useLocalStorageContext from "@/utils/hooks/useLocalStorageContext.ts";

export const Search = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const navigate = useNavigate()
  const { items, setItems, isLoading } = useSearchStore(useShallow(state => ({
    items: state.items,
    setItems: state.setItems,
    isLoading: state.isLoading
  })))
  const { setItemFromLocalStorage } = useLocalStorageContext()
  const [ debouncedQuery ] = useDebounce(query, 300)

  useEffect(() => {
    setItems(debouncedQuery)
  }, [setItems, debouncedQuery])

  return (
    <form className='flex justify-between items-center gap-3 min-w-[400px]'>
      <Command className="overflow-visible bg-transparent">
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <div className='w-full relative flex items-center bg-neutral-700 rounded-md p-0 z-0'>
              <CommandInput
                value={query}
                onValueChange={(q) => {
                  setQuery(q)
                  if (!open) setOpen(true)
                }}
                className='border-none w-full focus:outline-none text-white pl-10 z-1'
                onFocus={() => setOpen(false)}
              />
              <svg
                className='absolute left-3 z-10'
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                  height="21"
                  fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  fill="#D4D3D9"
                  d="M19.844 18.82c.195.196.195.508 0 .664l-.899.899c-.156.195-.468.195-.664 0l-4.726-4.727a.63.63 0 0 1-.117-.351v-.508c-1.446 1.21-3.282 1.953-5.313 1.953A8.119 8.119 0 0 1 0 8.625C0 4.172 3.633.5 8.125.5c4.453 0 8.125 3.672 8.125 8.125 0 2.031-.781 3.906-1.992 5.313h.508c.117 0 .234.078.351.156l4.727 4.726ZM8.125 14.875a6.243 6.243 0 0 0 6.25-6.25c0-3.438-2.813-6.25-6.25-6.25a6.243 6.243 0 0 0-6.25 6.25 6.219 6.219 0 0 0 6.25 6.25Z"
                />
              </svg>
              <Label className={`${query && 'hidden'} absolute left-10 text-gray-500 z-10 pointer-events-none`}>Search for a place...</Label>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className={`p-1 min-w-[293px] bg-neutral-700 text-white border-none`}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CommandList className="max-h-80">
              {!items.length
                ? <div className="p-1 text-center text-sm text-gray-400">{isLoading ? "Loading..." : "No results found."}</div>
                : items.map(({ name, latitude, longitude }, index) => (
                  <CommandItem
                    className='text-white h-full'
                    key={`${name}-${index}`}
                    onSelect={() => {
                      setOpen(false)
                      navigate(`/${name.toLowerCase()}`)
                      setItemFromLocalStorage({ name, latitude, longitude })
                    }}
                  >
                    {name}
                  </CommandItem>
                ))
              }
            </CommandList>
          </PopoverContent>
        </Popover>
      </Command>
      <Button
        size='lg'
        onClick={(e) => {
          e.preventDefault()
          if (!query) return
          navigate(`/${query.toLowerCase().trim()}`)
        }}
      >
        Search
      </Button>
    </form>
  )
}