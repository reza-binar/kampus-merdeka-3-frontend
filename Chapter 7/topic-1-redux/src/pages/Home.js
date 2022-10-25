import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import logo from "../logo.svg";
import { getAllUsers, createNewUser } from "../redux/actions/userActions";

function Home() {
  // This variable is to dispatch the actions
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getAllUsers actions
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
      </header>
    </div>
  );
}

export default Home;
