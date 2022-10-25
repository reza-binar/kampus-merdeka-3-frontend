import { GET_ALL_USERS } from "../types";
import users from "../../data/users.json";

export const getAllUsers = () => {
  try {
    // Imagize we get data from API (the variable is users)
    console.log("Hello");
    // Dispatch to reducers
    return {
      type: GET_ALL_USERS,
      payload: users,
    };
  } catch (error) {
    throw error;
  }
};
