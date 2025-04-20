import { create } from "zustand";
import { secureStore } from "./middleware/secure";
import { devtools, persist } from "zustand/middleware";

export type WeatherState = {
  current: GeolocationCoordinates | null;
  history: OpenWeather.Location[];
  addSearchHistory: (payload: OpenWeather.Location) => void;
}

export const useWeatherStore = create<WeatherState>()(
  devtools(persist(
    (set, get) => ({
      current: null,
      history: [],
      addSearchHistory: (payload) => {
        const state = get();
        const existingIndex = state.history.findIndex(item => item.name === payload.name);
        if (existingIndex !== -1) {
          state.history.splice(existingIndex, 1);
        }
        state.history.unshift(payload);
        return set({
          ...state
        });
      },
    }),
    secureStore('weather')
  ))
)
