import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowInput, setIsShowInput] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ password: { password }, email: { email } });
        if (email && password) {
            axios
                .post("/users/login", {
                    password: { password },
                    email: { email },
                })
                .then((res) => {
                    console.log(res.data);
                });
        }
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
