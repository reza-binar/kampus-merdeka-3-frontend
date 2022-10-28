import { CREATE_NEW_USER, GET_ALL_USERS, GET_DETAILS_USER } from "../types";
import axios from "axios";

// This function will be called in component and it will triggered the reducers
export const getAllUsers = () => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    // Dispatch to reducers
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getDetailsUser = (id) => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    // https://jsonplaceholder.typicode.com/users/1

    // Dispatch to reducers
    dispatch({
      type: GET_DETAILS_USER,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
