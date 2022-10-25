import { GET_ALL_USERS, CREATE_NEW_USER } from "../types";

// The initial state when the application load in first time
const initialState = {
  users: [],
};

// This function will be triggered when any action dispatching
const userReducer = (state = initialState, action) => {
  console.log("aku di user");
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case CREATE_NEW_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
