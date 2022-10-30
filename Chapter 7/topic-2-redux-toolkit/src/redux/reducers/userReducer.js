import { createSlice } from "@reduxjs/toolkit";

// The initial state when the application load in first time
const initialState = {
  users: [],
  user: null,
  token: localStorage.getItem("token"),
};

// Define the reducers
const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsersReducer: (state, action) => {
      state.users = action.payload;
    },
    getDetailsUserReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export the reducer function, the functions will be called in actions
export const { getAllUsersReducer, getDetailsUserReducer } = userSlicer.actions;

// Export the reducer to combine it with another reducers
export default userSlicer.reducer;
