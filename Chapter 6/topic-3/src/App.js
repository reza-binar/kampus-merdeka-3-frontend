import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import NotFound from "./pages/404.jsx";
import FileProcessing from "./pages/FileProcessing";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Header setToken={setToken} token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/posts"
            element={
              <Protected token={token} setToken={setToken}>
                <Posts />
              </Protected>
            }
          />
          <Route path="/file-processing" element={<FileProcessing />} />

          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
