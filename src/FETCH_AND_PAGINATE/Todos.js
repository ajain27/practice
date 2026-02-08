import React from "react";

function Todos({ todos }) {
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
