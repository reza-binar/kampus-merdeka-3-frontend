import React from "react";
import { useSelector } from "react-redux";

function UsersAndTodos() {
  // If you use redux, you want to read some data you have use useSelector
  const { user, todo } = useSelector((state) => state);

  return (
    <div className="App">
      <header className="App-header">
        Users: {JSON.stringify(user.users)}
        Todos: {JSON.stringify(todo.todos)}
      </header>
    </div>
  );
}

export default UsersAndTodos;
