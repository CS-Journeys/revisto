import React from "react";
import logo from "../revistoLogo.svg";
import { Link } from "react-router-dom";

/**
 * Component Navbar to be displayed at the top of the page in
 * all windows.
 * @param  {User} user       The current user logged in
 * @return {JSX.Element}     The updated Navbar
 */
const Navbar = ({ user }) => {
    return (
        <div className="nav-control">
            <nav className="navbar navbar-expand-lg navbar-light nav-bg">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Logo" id="logo" />
                </Link>

                {/* Mobile Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav navbar-left">
                        <Link className="nav-link" to="#">
                            <h4>Featured</h4>
                        </Link>
                        <Link className="nav-link" to="/about">
                            <h4>About</h4>
                        </Link>
                    </div>
                    {user ? (
                        <Link className="nav-link" to="/me">
                            <span>Your Journals</span>
                        </Link>
                    ) : (
                        <div className="navbar-nav navbar-right">
                            <Link className="nav-link" to="/register">
                                <span>Sign Up</span>
                            </Link>
                            <Link className="nav-link" to="/login">
                                <span>Login</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
