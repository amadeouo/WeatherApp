import { create } from "zustand/react";
import type { TItems } from "@/types/types.ts";

export interface SearchStore {
  items: TItems[],
  isLoading: boolean,
  error: string | null,
  // setInitialItems: () => void,
  setItems: (query: string) => void,
}

export const useSearchStore = create<SearchStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  // TODO: add initial items based on geolocation
  // setInitialItems: async () => {
  //   const userLocation = useGeolocationStore.getState().location
  //   if (userLocation) {
  //     set({ isLoading: true })
  //     try {
  //       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userLocation.latitude.toFixed(4)}&lon=${userLocation.longitude.toFixed(4)}&accept-language=ru`)
  //       const data = await response.json()
  //       const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
  //       const items = get().items
  //       set({ items: items.add(city)})
  //     } catch (e: any) {
  //       set({ error: e.message })
  //     } finally {
  //       set({ isLoading: false })
  //     }
  //
  //     try {
  //       const response = await fetch(`https://api.open-meteo.com/v1/search?name=${get().items[0]}&language=ru&format=json`)
  //       const data = await response.json()
  //       const city = data.location.city
  //       const items = get().items
  //       set({ items: items.add(city)})
  //     } catch (e: any) {
  //       set({ error: e.message })
  //     } finally {
  //       set({ isLoading: false })
  //     }
  //   }
  // },
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
      const rawItems = results.map((item: any) => ({
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
      }))
      const items = rawItems.reduce((acc: any, item: any ) => {
        if (!acc.find((i: any) => i.name === item.name)) acc.push(item)
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