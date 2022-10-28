import { GET_ALL_TODOS, CREATE_TODO } from "../types";

// The initial state when the application load in first time
const initialState = {
  todos: [],
};

// This function will be triggered when any action dispatching
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};

export default todoReducer;
