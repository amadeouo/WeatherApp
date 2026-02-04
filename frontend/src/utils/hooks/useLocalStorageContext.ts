import { useContext } from "react";
import { LocalStorageContext } from "@/app/context/LocalStorageContext.ts";

const useLocalStorage = () => {
  const context = useContext(LocalStorageContext)

  if (!context) {
    throw new Error('useCounterContext must be used within CounterContext')
  }

  return context
}

export default useLocalStorage