import { useState } from "react";
import Todos from "./Todos";
import { v4 as uuidv4 } from "uuid";

function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const handleAdd = (todo) => {
    if (!todo.trim()) return;

    const newTodo = {
      id: uuidv4(),
      task: todo,
      isCompleted: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setValue("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <label htmlFor="todo">Enter Todo: </label>
      <input
        id="todo"
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <button onClick={() => handleAdd(value)}>Add</button>

      <div>
        {todos.map((todo) => (
          <>
            <Todos key={todo.id} task={todo} deleteTodo={handleDelete} />
          </>
        ))}
      </div>
    </div>
  );
}

export default TodoWrapper;
