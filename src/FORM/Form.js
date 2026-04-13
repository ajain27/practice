import { useMemo, useState } from "react";
import "./style.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const isNameValid = formData.name.length > 0 && formData.name.length < 10;
  const isEmailValid = formData.email.length > 0 && formData.email.length < 10;

  const isFormValid = useMemo(() => {
    return isNameValid && isEmailValid;
  }, [isNameValid, isEmailValid]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log({
      name: formData.name.trim(),
      email: formData.email.trim(),
    });

    setFormData({
      name: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

        <button type="submit" disabled={!isFormValid}>
          Enter
        </button>
      </form>
    </div>
  );
}

export default Form;
