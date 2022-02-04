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
    <div className="form custom-form">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <div className="form-floating">
          <input type="text" 
            id="email"
            name="email" 
            className="form-control cf-control"
            placeholder="Email" />
        </div>
        <div className="form-floating">
          <input
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            className="form-control cf-control"
            placeholder="Password"
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
