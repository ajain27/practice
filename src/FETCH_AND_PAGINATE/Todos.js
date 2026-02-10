import React from "react";

function Todos({ todos }) {
  return (
    <div className="container">
      <ul>
        {todos.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
