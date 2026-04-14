function Todos({ task, deleteTodo }) {
  return (
    <div>
      <span>{task.task}</span>

      <button onClick={() => deleteTodo(task.id)}>Delete</button>
    </div>
  );
}

export default Todos;
