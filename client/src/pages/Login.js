import React from "react";
import LoginForm from "../forms/LoginForm";

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
    return (
        <div className="container">
            <LoginForm />
        </div>
    );
};

export default Login;
