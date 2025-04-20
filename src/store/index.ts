import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./slices";
import { encryptTransform } from "./transformer/encrypt";

const persistedReducer = persistReducer<RootState>({
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_KEY,
      onError: function (error: any) {
        // Handle the error.
        console.error('Data malformed', error);
      },
    }),
  ],
}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
