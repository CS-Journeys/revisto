import React, { useState } from "react";
import logo from "../assets/media/revistoLogo-primary.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useSignOut } from "../hooks/userHook";
import ConfirmationModal from "../components/ConfirmationModal";

/**
 * Component Navbar to be displayed at the top of the page in
 * all windows.
 * @param  {User} user       The current user logged in
 * @return {JSX.Element}     The updated Navbar
 */
const Navbar = ({ user, updateParams }) => {
    const isMobile = window.matchMedia('(max-width: 1000px)').matches;
    const [showSignOut, setShowSignOut] = useState(false);
    const nav = useNavigate();
    const { signOut } = useSignOut();

    const onSignOut = () => {
        signOut();
        nav("/");
    }

    const leftLinks = [{ 
            text: "Featured",
            url: "/featured",
            key: 0
        },
        {
            text: "About",
            url: "/about",
            key: 1
    }]

    const rightLinksNotSignedIn = [{ 
            text: "Sign Up",
            url: "/register",
            key: 2
        },
        {
            text: "Login",
            url: "/login",
            key: 3
    }]

    return (
        <div className="nav-control">
            <nav className="navbar navbar-expand-lg navbar-light nav-bg">
                {/* Logo */}
                <Link onClick={() => updateParams("Home")} to="/" className="nav-logo">
                    <img src={logo} alt="Logo" id="logo" />
                </Link>

                {/* Mobile Button */}
                { (isMobile) ? 
                    <NavDropdown
                        className="navbar-toggler"
                        type="button">
                        
                        { leftLinks.map(link => 
                            <NavDropdown.Item className="nav-link" key={link.key} 
                                onClick={() => updateParams(link.text)} href={link.url}>

                                <h4>{link.text}</h4>
                            </NavDropdown.Item>) }
                        { rightLinksNotSignedIn.map(link => 
                                <NavDropdown.Item className="nav-link navbar-right" key={link.key} 
                                onclick={() => updateParams(link.text)} href={link.url}>
                                    <span>{link.text}</span>
                                </NavDropdown.Item>) }
                    </NavDropdown> : 
                    <div className="collapse navbar-collapse">
                        <div className="navbar-nav navbar-left">
                            { leftLinks.map(link => 
                                <Link className="nav-link" key={link.key} 
                                    onClick={() => updateParams(link.text)} to={link.url}>

                                    <h4>{link.text}</h4>
                                </Link>)}
                        </div>
                            { user ? (
                                <div className="navbar-nav navbar-right">
                                    <Link className="nav-link" to={useLocation} onClick={() => setShowSignOut(true)}>
                                        <span>Sign Out</span>
                                    </Link>
                                    <ConfirmationModal
                                        confirmText="Yes"
                                        body="Are you sure you want to sign out?"
                                        title="Bye forever?"
                                        onConfirm={onSignOut}
                                        show={showSignOut}
                                        onHide={() => setShowSignOut(false)}>
                                    </ConfirmationModal>
                                    <Link className="nav-link" to="/me">
                                        <span>My Journals</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="navbar-nav navbar-right">
                                    { rightLinksNotSignedIn.map(link => 
                                <Link className="nav-link" key={link.key} to={link.url}>
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
