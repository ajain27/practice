function Todo({ todo, deleteTodo, editTodo }) {
  return (
    <div>
      <span>{todo.task}</span>
      <button onClick={() => deleteTodo(todo.id)}>Remove</button>
      <button onClick={() => editTodo(todo.id)}>Edit</button>
    </div>
  );
}

export default Todo;
