import React from "react";
import logo from "../assets/media/revistoLogo.svg";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

/**
 * Component Navbar to be displayed at the top of the page in
 * all windows.
 * @param  {User} user       The current user logged in
 * @return {JSX.Element}     The updated Navbar
 */
const Navbar = ({ user }) => {

    const isMobile = window.matchMedia('(max-width: 1000px)').matches;
    const leftLinks = [
        { 
            text: "Featured",
            url: "#"
        },
        {
            text: "About",
            url: "/about"
        }
    ]

    const rightLinks = [
        { 
            text: "Sign Up",
            url: "/register"
        },
        {
            text: "Login",
            url: "/login"
        }
    ]

    return (
        <div className="nav-control">
            <nav className="navbar navbar-expand-lg navbar-light nav-bg">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Logo" id="logo" />
                </Link>

                {/* Mobile Button */}
                { (isMobile) ? 
                    <NavDropdown
                        className="navbar-toggler"
                        type="button">
                        
                        { leftLinks.map(link => 
                            <NavDropdown.Item className="nav-link" href={link.url}>
                                <h4>{link.text}</h4>
                            </NavDropdown.Item>) }

                        { rightLinks.map(link => 
                            <NavDropdown.Item className="nav-link" href={link.url}>
                                <span>{link.text}</span>
                            </NavDropdown.Item>) }
                    </NavDropdown> :

                    <div className="collapse navbar-collapse">
                        <div className="navbar-nav navbar-left">
                            { leftLinks.map(link => 
                                <Link className="nav-link" to={link.url}>
                                    <h4>{link.text}</h4>
                                </Link>)}
                        </div>
                        {user ? (
                                <Link className="nav-link" to="/me">
                                    <span>Your Journals</span>
                                </Link>
                            ) : (
                                <div className="navbar-nav navbar-right">
                                    { rightLinks.map(link => 
                                <Link className="nav-link" to={link.url}>
                                    <span>{link.text}</span>
                                </Link>)}
                                </div>
                            )}
                    </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;
