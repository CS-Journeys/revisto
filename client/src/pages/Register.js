import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../services/userService";

/**
 * React component for displaying the register page.
 * @returns {JSX.Element} The register page.
 */
const Register = () => {
    const { register, error } = useRegister();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        register(
            {
                email: form.get("email"),
                password: form.get("password"),
                confirm: form.get("confirm"),
            },
            {
                onSuccess: () => {
                    nav("/");
                },
            }
        );
    };

    return (
        <main className="form custom-form text-center">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>
                )}
                <div className="form-floating">
                    <input
                        className="form-control cf-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="form-floating">
                    <input
                        className="form-control cf-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="form-floating">
                    <input
                        className="form-control cf-control"
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
