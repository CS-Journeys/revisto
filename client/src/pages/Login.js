import React, { Component } from "react";
import LoginForm from "../forms/LoginForm";

// Axios POST requests will be made
// using the login page

/*
 * Each User in the databse has:
 *  _id: id of the collection
 *  username: the email of the user
 *  region: region of the user
 *  language: language of the user
*/

const Login = () => {
    return (
        <div className="container">
            <LoginForm />
        </div>
    );
};

export default Login;