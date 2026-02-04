import { LocalStorageContext } from "@/app/context/LocalStorageContext.ts";
import type { ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { TItems } from "@/types/types.ts";

type LocalStorageProviderProps = {
  children: ReactNode;
}

export const LocalStorageProvider = ({ children }: LocalStorageProviderProps) => {
  const [itemFromLocalStorage, setItemFromLocalStorage] = useLocalStorage<TItems>('item', {
    name: '',
    latitude: 0,
    longitude: 0,
  });

  return (
    <LocalStorageContext.Provider value={{ itemFromLocalStorage, setItemFromLocalStorage }}>
      {children}
    </LocalStorageContext.Provider>
  )
}