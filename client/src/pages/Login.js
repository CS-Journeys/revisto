import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

// Axios POST requests will be made
// using the login page

/*
 * Each User in the databse has:
 *  _id: id of the collection
 *  username: the email of the user
 *  region: region of the user
 *  language: language of the user
 */

export default class Login extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <LoginForm />
            </div>
        );
    }
}
