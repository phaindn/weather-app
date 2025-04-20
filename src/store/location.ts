import { create } from "zustand";
import { secureStore } from "./middleware/secure";
import { devtools, persist } from "zustand/middleware";
import { database } from "@/utils/indexdb";

export type LocationState = {
  current: GeolocationCoordinates | null;
  history: OpenWeather.Location[];
  addSearchHistory: (payload: OpenWeather.Location) => void;
  removeSearchHistoryAt: (index: number) => void;
}

export const useLocationStore = create<LocationState>()(
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
