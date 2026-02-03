import { create } from "zustand/react";
import type { TLocation } from "@/types/types.ts";

export interface GeolocationStore {
  location: TLocation | null,
  loading: boolean,
  error: string | null,
  getLocation: () => void,
}

export const useGeolocationStore = create<GeolocationStore>((set) => ({
  location: null,
  loading: false,
  error: null,

  getLocation: () => {
    if (!("geolocation" in navigator)) {
      set({ error: "Geolocation is not supported by your browser" })
    }
    navigator.geolocation.getCurrentPosition((position) => {
      set({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        error: null
      })
    }, () => set({error: "Unable to retrieve your location"}));
  }
}))