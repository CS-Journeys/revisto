import React, { Component } from 'react'
import Navbar from '../components/Navbar';

// Axios POST requests will be made
// using the login page

/*
 * Each User in the databse has:
 *  _id: id of the collection
 *  username: the email of the user
 *  region: region of the user
 *  language: language of the user
*/

class Login extends Component {
    render() {
        return (<div>
            <Navbar />
            <h1>Login Page</h1>
        </div>);
    }
}

export default Login;