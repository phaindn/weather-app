import { createSlice } from "@reduxjs/toolkit";

export type LocationState = {
  current: GeolocationCoordinates | null;
  history: OpenWeather.Location[];
}

const initialState: LocationState = {
  current: null,
  history: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addSearchHistory: (state, action) => {
      const { payload } = action;
      const existingIndex = state.history.findIndex(item => item.name === payload.name);
      if (existingIndex !== -1) {
        state.history.splice(existingIndex, 1);
      }
      state.history.unshift(payload);
      return state;
    },
    removeSearchHistoryAt: (state, action) => {
      const { payload } = action;
      state.history.splice(payload, 1);
      return state;
    }
  }
})

export const LocationActions = locationSlice.actions;
export const LocationReducer = locationSlice.reducer;
