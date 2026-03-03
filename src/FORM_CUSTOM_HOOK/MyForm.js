import { useForm } from "./hooks/useForm.js";

const formFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

function MyForm() {
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) errors.firstName = "Required";
    if (!values.email) errors.email = "Email required";
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { firstName: "", email: "", password: "" },
    validate,
  );

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
          />
          {errors[field.name] && (
            <p style={{ color: "red" }}>{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
