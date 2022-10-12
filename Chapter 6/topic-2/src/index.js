import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import Posts from "./pages/Posts";
import NotFound from "./pages/404.jsx";
import FileProcessing from "./pages/FileProcessing";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/posts"
        element={
          <Protected>
            <Posts />
          </Protected>
        }
      />
      <Route path="/file-processing" element={<FileProcessing />} />

      <Route path="/login" element={<Login />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
