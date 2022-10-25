import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

// Initial state, the default state
const initialState = {};

// Create new store (temporary database) with reducers those we have
const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;
