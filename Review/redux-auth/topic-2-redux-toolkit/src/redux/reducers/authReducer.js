import { createSlice } from "@reduxjs/toolkit";

// The initial state when the application load in first time
const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

// Define the reducers
const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export the reducer function, the functions will be called in actions
export const { setToken, setUser } = authSlicer.actions;

// Export the reducer to combine it with another reducers
export default authSlicer.reducer;
