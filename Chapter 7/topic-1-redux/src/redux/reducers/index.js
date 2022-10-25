import { combineReducers } from "redux";
import userReducer from "./userReducer";
import todoReducer from "./todosReducer";

export default combineReducers({
  user: userReducer,
  todo: todoReducer,
});
