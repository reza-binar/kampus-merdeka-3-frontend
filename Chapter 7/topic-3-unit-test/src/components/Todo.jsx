import React from "react";

function Todo({ todo }) {
  // It will get object from todo (App.js)
  const { id, title, completed } = todo;

  // Make h1 varible that contain title of the todo
  const h1 = <h1>{title}</h1>;

  // Make varible that check todo is completed or incompleted
  // If complete we will add a strike in the title of todo
  // Else we will not add a strike in the title of todo
  const text = completed ? <strike>{h1}</strike> : h1;

  return <div data-testid={`todo-${id}`}>{text}</div>;
}

export default Todo;
