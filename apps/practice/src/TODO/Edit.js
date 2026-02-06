import { useState } from "react";

function Edit({ onEdit, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(value, task.id);
    setValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Update</button>
      </form>
    </div>
  );
}

export default Edit;
