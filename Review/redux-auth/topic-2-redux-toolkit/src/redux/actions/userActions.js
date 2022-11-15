import axios from "axios";

import {
  getAllUsersReducer,
  getDetailsUserReducer,
} from "../reducers/userReducer";

// This function will be called in component and it will triggered the reducers
export const getAllUsers = () => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    // Dispatch to reducers
    dispatch(getAllUsersReducer(data));
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
    dispatch(getDetailsUserReducer(data));
  } catch (error) {
    throw error;
  }
};
