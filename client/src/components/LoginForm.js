import React, { Component, useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowInput, setIsShowInput] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            axios
                .post("/users/login", {
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => alert(error));
        }
        setEmail("");
        setPassword("");
    };

    return (
        <article className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password: </label>
                    <input
                        type={isShowInput ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Login
                </button>
                <span className="check">
                    <label htmlFor="Show Pass">
                        <input
                            type="checkbox"
                            onChange={() => setIsShowInput(!isShowInput)}
                        />
                        Show Password
                    </label>
                </span>
            </form>
        </article>
    );
};

export default LoginForm;
