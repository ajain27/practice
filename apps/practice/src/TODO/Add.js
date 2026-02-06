import { useState } from "react";

function Add({ add }) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    add(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Add;
