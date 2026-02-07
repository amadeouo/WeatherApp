import { create } from "zustand/react";
import type { TItems } from "@/types/types.ts";

export interface SearchStore {
  items: TItems[],
  isLoading: boolean,
  error: string | null,
  setItems: (query: string) => void,
}

export const useSearchStore = create<SearchStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  setItems: async (query: string) => {
    const queryTrimmed = query.trim()
    set({ isLoading: true })
    if (!queryTrimmed) {
      set({ items: [], isLoading: false })
      return
    }
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(queryTrimmed)}&count=4&language=eng&format=json`)
      const data = await response.json()
      
      const results = Array.isArray(data.results) ? data.results : []
      const rawItems = results.map((item: TItems) => ({
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
      }))
      const items = rawItems.reduce((acc: TItems[], item: TItems ) => {
        if (!acc.find((i: TItems) => i.name === item.name)) acc.push(item)
        return acc
      }, [])
      set({ items: items })

    } catch (e: any) {
      set({ error: e.message })
    } finally {
      set({ isLoading: false })
    }
  },
}))