import axios from "axios";
import React, { Component } from "react";

class Register extends Component {
  handleSubmit = (e) => {
    // Prevent the default action of submitting the form
    e.preventDefault();
    // Get the values of the form
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    axios
      .post("/users/register", {
        email,
        password,
      })
      .then(({ data: { err, token } }) => {
        if (err) {
          console.log(err);
        } else {
          localStorage.setItem("token", token);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <main className="form-signin text-center">
        <form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
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
                id="confirmPassword"
              />
            </div>
            <button className="w-100 btn btn-primary" type="submit">
              Register
            </button>
        </form>
      </main>
    );
  }
}

export default Register;
