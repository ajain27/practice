import { useState } from "react";
import Todo from "./Todo.js";
import Edit from "./Edit.js";
import Add from "./Add.js";

function TODO_WRAPPER() {
  const [todos, setTodos] = useState([]);

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onAdd = (todo) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), task: todo, isEditied: false },
    ]);
  };

  // loads the edit form
  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditied: !todo.isEditied } : todo,
      ),
    );
  };

  // updates the actual task
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditied: !todo.isEditied } : todo,
      ),
    );
  };

  return (
    <div>
      <Add add={onAdd} />
      {todos.map((todo) =>
        todo.isEditied ? (
          <Edit onEdit={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={onDelete}
            editTodo={updateTodo}
          />
        ),
      )}
    </div>
  );
}

export default TODO_WRAPPER;
