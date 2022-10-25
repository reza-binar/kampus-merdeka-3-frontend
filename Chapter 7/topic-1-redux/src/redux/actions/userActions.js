import { CREATE_NEW_USER, GET_ALL_USERS } from "../types";
import users from "../../data/users.json";

// This function will be called in component and it will triggered the reducers
export const getAllUsers = () => {
  try {
    // Imagize we get data from API (the variable is users)
    // Dispatch to reducers
    return {
      type: GET_ALL_USERS,
      payload: users,
    };
  } catch (error) {
    throw error;
  }
};

// This function will be called in component and it will triggered the reducers
export const createNewUser = () => {
  try {
    return {
      type: CREATE_NEW_USER,
      payload: "Ini adalah indar",
    };
  } catch (error) {
    throw error;
  }
};
