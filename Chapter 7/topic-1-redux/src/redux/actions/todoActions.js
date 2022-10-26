import { GET_ALL_TODOS, CREATE_TODO } from "../types";
import axios from "axios";

// This function will be called in component and it will triggered the reducers
export const getAllTodos = () => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Dispatch to reducers
    dispatch({
      type: GET_ALL_TODOS,
      payload: data,
    });
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

    dispatch({
      type: CREATE_TODO,
      payload: JSON.parse(data.body),
    });
  } catch (error) {
    throw error;
  }
};
