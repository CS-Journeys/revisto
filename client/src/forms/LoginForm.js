import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isShowInput: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.email && this.state.password) {
            axios.post("/users/login", config)
            .then(res => {
                console.log("success: ", res.data.token);
                localStorage.setItem("token", res.data.token);
            })
            .catch(err => { console.error(err) });
        }
        this.setState({email : "", password : "" });
    };

    render() {
        return (<article className="form">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <div className="form-control">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value }) }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password: </label>
                        <input
                            type={this.state.isShowInput ? "text" : "password"}
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value }) }
                        />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                    <span className="check">
                        <label htmlFor="Show Pass">
                            <input
                                type="checkbox"
                                onChange={() => this.setState({ isShowInput: !this.state.isShowInput }) }
                            />
                            Show Password
                        </label>
                    </span>
                </form>
            </article>);
    }
};

export default LoginForm;
