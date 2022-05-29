import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/userHook";
import { useNavigate } from "react-router-dom";

// Axios POST requests will be made
// using the login page

/**
 * @typedef User
 * @type {Object}
 * @property {Number} _id - id of the collection
 * @property {String} username - the email of the user
 * @property {String} region - region of the user
 * @property {Stromg} language - language of the user
 */

/**
 * React component for displaying the login page.
 * @returns {JSX.Element} The login page.
 */

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const { login, error } = useLogin();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        login(
            {
                email: form.email.value,
                password: form.password.value,
                rememberMe: form.rememberMe.checked,
            },
            {
                onSuccess: () => {
                    nav("/");
                },
            }
        );
    };

    return (
        <div className="container">
            <div className="form custom-form">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Login</h1>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error.message}
                        </div>
                    )}
                    <div className="form-floating">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control cf-control"
                            placeholder="Email"
                        />
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
                            Don't have an account?{" "}
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </div>
                    <button type="submit">Login</button>
                    <span className="check">
                        <label htmlFor="Show Pass">
                            <input
                                type="checkbox"
                                onChange={() => setShowPass(!showPass)}
                            />
                            Show Password
                        </label>
                    </span>
                    <span className="check">
                        <label htmlFor="Remember Me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                            />
                            Remember Me
                        </label>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
