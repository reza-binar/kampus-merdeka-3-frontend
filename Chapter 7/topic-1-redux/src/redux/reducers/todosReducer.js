import { GET_ALL_TODOS } from "../types";

// The initial state when the application load in first time
const initialState = {
  todos: [],
};

// This function will be triggered when any action dispatching
const todoReducer = (state = initialState, action) => {
  console.log("aku di todo");
  switch (action.type) {
    case GET_ALL_TODOS:
      return {
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
