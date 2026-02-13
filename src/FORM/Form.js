import { useState } from "react";
import "./style.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={handleChange}
        />
        <button>Enter</button>
      </form>
    </div>
  );
}

export default Form;
