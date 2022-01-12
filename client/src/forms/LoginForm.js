import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/api";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const { login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (email && password) {
      login({ email, password }, {
        onSuccess: (token) => {
          //Set the token in local storage
          localStorage.setItem("token", token);
          window.location.href = "/";
        },
        onError: (err) => {
          console.log(err);
        }
      });
    }
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
