import { createSlice } from "@reduxjs/toolkit";

// The initial state when the application load in first time
const initialState = {
  todos: [],
};

// Define the reducers
const todoSlicer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAllTodosReducer: (state, action) => {
      state.todos = action.payload;
    },
    createNewTodoReducer: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
  },
});

// Export the reducer function, the functions will be called in actions
export const { getAllTodosReducer, createNewTodoReducer } = todoSlicer.actions;

// Export the reducer to combine it with another reducers
export default todoSlicer.reducer;
