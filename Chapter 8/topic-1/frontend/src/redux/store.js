import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";

// Create the store
const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
