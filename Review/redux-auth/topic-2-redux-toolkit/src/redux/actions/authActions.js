import axios from "axios";

import { setToken, setUser } from "../reducers/authReducer";

export const register = (data) => async (dispatch) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
      data
    );
    if (result.data.token) {
      // Set token from backend to local storage
      // {"data": { "token": "ini token" }}
      localStorage.setItem("token", result.data.token);
      dispatch(setToken(result.data.token));
      return;
    }
  } catch (error) {
    // If there are any error it will show the error message from backend
    // { "message": "Password salah" }
    alert(error.response.data.message);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const result = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
      data
    );
    if (result.data.token) {
      // Set token from backend to local storage
      // {"data": { "token": "ini token" }}
      localStorage.setItem("token", result.data.token);
      dispatch(setToken(result.data.token));
      return;
    }

    // Dispatch to reducers
    alert(result.data.message);
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const me = (callback) => async (dispatch, getState) => {
  try {
    // Get token
    const { token } = getState().auth;

    // Authorize from backend
    const result = await axios.get(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setUser(result.data));
  } catch (error) {
    if (error.response.status === 401) {
      // remove token
      localStorage.removeItem("token");
      dispatch(setToken(null));
      callback(error.response.status);
    }
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const setTokenAction = (token) => async (dispatch) => {
  dispatch(setToken(token));
};

export const loginWithGoogle = (accessToken) => async (dispatch) => {
  try {
    const data = {
      access_token: accessToken,
    };
    const result = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
      data
    );
    if (result.data.token) {
      // Set token from backend to local storage
      // {"data": { "token": "ini token" }}
      localStorage.setItem("token", result.data.token);
      dispatch(setToken(result.data.token));
    }
  } catch (error) {
    // If there are any error it will show the error message from backend
    // { "message": "Password salah" }
    alert(error.response.data.message);
  }
};
