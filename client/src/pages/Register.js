import React, { useState } from "react";
import { useRegister } from "../hooks/api";

const Register = () => {
  const [msg, setMsg] = useState("");
  const { register } = useRegister();

  const handleSubmit = (e) => {
    // Prevent the default action of submitting the form
    e.preventDefault();
    // Get the values of the form
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    // Check if the passwords match
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    // Make sure all fields are filled
    if (email === "" || password === "" || confirm === "") {
      setMsg("Please fill out all fields");
      return;
    }

    register({ email, password }, {
      onSuccess: () => {
        window.location.href = "/";
      },
      onError: (err) => {
        setMsg(err.message);
      }
    });
  };

  return (
    <main className="form-signin text-center">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {msg !== "" && (
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        )}
        <div className="form-floating">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
          />
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            id="confirmPassword"
          />
        </div>
        <button className="w-100 btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
