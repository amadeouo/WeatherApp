import { create } from "zustand/react";

export interface UnitStore {
  temperature: 'celsius' | 'fahrenheit',
  windSpeed: 'kmh' | 'mph',
  precipitation: 'mm' | 'in',

  setTemperature: (unit: 'celsius' | 'fahrenheit') => void,
  setWindSpeed: (unit: 'kmh' | 'mph') => void,
  setPrecipitation: (unit: 'mm' | 'in') => void,
  switchToImperial: () => void,
  switchToBasic: () => void,
}

export const useUnitsStore = create<UnitStore>((set) => ({
  temperature: 'celsius',
  windSpeed: 'kmh',
  precipitation: 'mm',

  setTemperature: (unit: 'celsius' | 'fahrenheit') => set({ temperature: unit }),
  setWindSpeed: (unit: 'kmh' | 'mph') => set({ windSpeed: unit }),
  setPrecipitation: (unit: 'mm' | 'in') => set({ precipitation: unit }),
  switchToImperial: () => {
    set({
      temperature: 'fahrenheit',
      windSpeed: 'mph',
      precipitation: 'in',
    })
  },
  switchToBasic: () => {
    set({
      temperature: 'celsius',
      windSpeed: 'kmh',
      precipitation: 'mm',
    })
  },
}))