import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";

// We have reducers, it will called in store to create an global state
export default combineReducers({
  auth: authReducer,
  user: userReducer,
  todo: todoReducer,
});
