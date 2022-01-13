import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const { login } = useLogin();

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    login(
      {
        email: form.email.value,
        password: form.password.value,
      },
      {
        onSuccess: () => {
          nav("/");
        },
      }
    );
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-control">
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password: </label>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
          />
        </div>
        <div>
          <span>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </span>
        </div>
        <button type="submit">Login</button>
        <span className="check">
          <label htmlFor="Show Pass">
            <input type="checkbox" onChange={() => setShowPass(!showPass)} />
            Show Password
          </label>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
