import { create } from "zustand/react";
import type { TItems, TLocation } from "@/types/types.ts";

export interface GeolocationStore {
  location: TLocation | null,
  isLoading: boolean,
  error: string | null,
  getLocation: () => Promise<TLocation | null>,
  setItemsFromLocation: () => void,
  items: TItems,
}

export const useGeolocationStore = create<GeolocationStore>((set, get) => ( {
  location: null,
  items: { name: '', longitude: 0, latitude: 0 },
  isLoading: false,
  error: null,

  getLocation: () => {
    return new Promise((resolve, reject) => {
      if (!( "geolocation" in navigator )) {
        set({ error: "Geolocation is not supported on your device." });
        reject();
        return;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        set({ location: loc, error: null });
        resolve(loc);
      }, (err) => {
        set({ error: "Unable to retrieve your location" });
        reject(err);
      });
    });
  },
  setItemsFromLocation: async () => {
    const userLocation = await get().getLocation()

    if (userLocation) {
      set({ isLoading: true })
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userLocation.latitude.toFixed(4)}&lon=${userLocation.longitude.toFixed(4)}&accept-language=en-US`)
        const data = await response.json()
        const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
        const item = {
          name: city,
          longitude: userLocation.longitude,
          latitude: userLocation.latitude
        }
        set({ items: item })
      } catch (e) {
        const error = e as Error
        set({ error: error.message })
      } finally {
        set({ isLoading: false })
      }
    }
  },
}))