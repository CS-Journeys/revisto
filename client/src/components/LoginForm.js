import React, { useState } from "react";

const LoginForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName && password) {
            /* Do Axios Stuff */
        }
    };

    return (
        <article className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">Username: </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Login
                </button>
            </form>
        </article>
    );
};

export default LoginForm;
