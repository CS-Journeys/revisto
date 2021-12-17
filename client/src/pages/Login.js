import React, { Component } from 'react'
import Navbar from '../components/Navbar';

// Axios POST requests will be made
// using the login page

class Login extends Component {
    render() {
        return (<div>
            <Navbar />
            <h1>Login Page</h1>

        </div>);
    }
}

export default Login;