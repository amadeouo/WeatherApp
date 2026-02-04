import { createContext, type Dispatch, type SetStateAction } from "react";
import type { TItems } from "@/types/types.ts";

export type TLocalStorageContext = {
  itemFromLocalStorage: TItems;
  setItemFromLocalStorage: Dispatch<SetStateAction<TItems>>;
}

export const LocalStorageContext = createContext<TLocalStorageContext | undefined>(undefined);