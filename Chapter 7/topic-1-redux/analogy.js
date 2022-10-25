// Initial state in reducer (./redux/reducers)
const initialStateUser = {
  users: [],
};

// Initial state in reducer (./redux/reducers)
const initialStateTodo = {
  todos: [],
};

// user reducer (./redux/reducers)
function userReducer(state = initialStateUser, action) {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}

// todo reducer (./redux/reducers)
function todoReducer(state = initialStateTodo, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// function in action (./redux/actions)
const action = {
  type: "GET_ALL_USERS",
  payload: {
    id: 1,
    name: "Reza",
  },
};

// If action run, it will triggered every reducers
// Dispatch is background process that triggered every reducers
console.log(userReducer(initialStateUser, action));
console.log(todoReducer(initialStateTodo, action));
