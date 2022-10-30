import axios from "axios";

import {
  getAllTodosReducer,
  createNewTodoReducer,
} from "../reducers/todoReducer";

// This function will be called in component and it will triggered the reducers
export const getAllTodos = () => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Dispatch to reducers
    dispatch(getAllTodosReducer(data));
  } catch (error) {
    throw error;
  }
};

export const createNewTodo = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    dispatch(createNewTodoReducer(JSON.parse(data.body)));
  } catch (error) {
    throw error;
  }
};
