import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import UsersAndTodos from "./pages/UsersAndTodos";
import store from "./redux/store";

function App() {
  return (
    // We will use the store (temporary database)
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/userstodos" element={<UsersAndTodos />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
