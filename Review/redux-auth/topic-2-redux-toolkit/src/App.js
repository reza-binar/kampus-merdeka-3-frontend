import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import UsersAndTodos from "./pages/UsersAndTodos";
import About from "./pages/About";
import Posts from "./pages/Posts";
import NotFound from "./pages/404.jsx";
import FileProcessing from "./pages/FileProcessing";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Register from "./pages/Register";
import store from "./redux/store";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todo />} />
            <Route path="/userstodos" element={<UsersAndTodos />} />
            <Route
              path="/about"
              element={
                <Protected types={["user", "admin"]}>
                  <About />
                </Protected>
              }
            />
            <Route
              path="/posts"
              element={
                <Protected types={["admin"]}>
                  <Posts />
                </Protected>
              }
            />
            <Route path="/file-processing" element={<FileProcessing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer theme="colored" position="top-right" />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
