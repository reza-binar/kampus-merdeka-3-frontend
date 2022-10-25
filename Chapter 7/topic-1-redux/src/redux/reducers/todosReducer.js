import { GET_ALL_TODOS } from "../types";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
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
