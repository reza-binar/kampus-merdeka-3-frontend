import { combineReducers } from "redux";
import userReducer from "./userReducer";
import todoReducer from "./todosReducer";

// We have reducers, it will called in store to create an global state
export default combineReducers({
  user: userReducer,
  todo: todoReducer,
});

/*
  {
    user: {
      users: [],
      cikal: [],
    }
  }
*/
