import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";

// Create the store
const store = configureStore({
  reducer: rootReducers,
});

export default store;
