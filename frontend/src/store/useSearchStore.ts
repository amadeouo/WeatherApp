import { create } from "zustand/react";

export interface SearchStore {
  items: Set<string>,
  isLoading: boolean,
  error: string | null,
  // setInitialItems: () => void,
  setItem: (query: string) => void,
}

export const useSearchStore = create<SearchStore>((set) => ({
  items: new Set<string>(),
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
  setItem: async (query: string) => {
    const queryTrimmed = query.trim()
    set({ isLoading: true })
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${queryTrimmed}&count=4&language=eng&format=json`)
      const data = await response.json()
      const items = new Set<string>(data.results.map((item: any) => item.name))
      set({ items: items })
    } catch (e: any) {
      set({ error: e.message })
    } finally {
      set({ isLoading: false })
    }
    if (!queryTrimmed) {
      set({ items: new Set<string>() })
    }
  }
}))