import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";

// We have reducers, it will called in store to create an global state
export default combineReducers({
  user: userReducer,
  todo: todoReducer,
});
