import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../logo.svg";

function UsersAndTodos() {
  // If you use redux, you want to read some data you have use useSelector
  const { user, todo } = useSelector((state) => state);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        Users: {JSON.stringify(user.users)}
        Todos: {JSON.stringify(todo.todos)}
      </header>
    </div>
  );
}

export default UsersAndTodos;
