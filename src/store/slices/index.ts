import { combineReducers } from "@reduxjs/toolkit";
import { LocationReducer } from "./location";

const rootReducer = combineReducers({
  location: LocationReducer,
})

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
