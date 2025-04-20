import { create } from "zustand";
import { secureStore } from "./middleware/secure";
import { devtools, persist } from "zustand/middleware";

export type LocationState = {
  current: GeolocationCoordinates | null;
  predictedLocation: OpenWeather.Location | null;
  history: OpenWeather.Location[];
  setCurrent: (payload: GeolocationCoordinates) => void;
  setPredictedLocation: (payload: OpenWeather.Location) => void;
  addSearchHistory: (payload: OpenWeather.Location) => void;
  removeSearchHistoryAt: (index: number) => void;
}

export const useLocationStore = create<LocationState>()(
  devtools(persist(
    (set, get) => ({
      current: null,
      predictedLocation: null,
      history: [],
      setCurrent: (payload) => {
        const state = get();
        state.current = payload;
        return set({
          ...state
        });
      },
      setPredictedLocation(payload) {
        const state = get();
        state.predictedLocation = payload;
        return set({
          ...state,
        });
      },
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
      removeSearchHistoryAt: (payload) => {
        const state = get();
        state.history.splice(payload, 1);
        return set({
          ...state,
        })
      }
    }),
    secureStore<LocationState>('location')
  ))
)
