import "./App.css";
import Todo from "./components/Todo";

function App() {
  // This data will be consume by Todo Component
  const todos = [
    { id: 1, title: "mandiin kucing", completed: false },
    { id: 2, title: "make dinner", completed: true },
  ];

  return (
    <div className="App">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default App;
