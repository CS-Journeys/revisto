import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (email && password) {
      axios
        .post("/users/login", {email,password})
        .then(({ data }) => {
          if (data.err) {
            console.log(data.err);
          } else {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.error(err);
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
