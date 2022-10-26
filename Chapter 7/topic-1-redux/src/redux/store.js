import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// Initial state, the default state
const initialState = {};

// We will only can open redux devtools in development not in production
const middleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

// Create new store (temporary database) with reducers those we have
// Add redux thunk to enable actions with async
// If we don't use the middleware (such as thunk), we will no able to make asynchronous actions and we are only able to make sync actions
// applyMiddleware means we will use thunk for our storage actions
const store = createStore(rootReducer, initialState, middleware);

export default store;
