import React, { Component } from 'react';
import logo from '../revistoLogo.svg'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };
    }

    render() {
        return (
        <nav className="navbar navbar-expand nav-bg">
            <Link to="/" className="nav-logo">
                <img src={logo} alt="Logo" id="logo"/>
            </Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="#">New</a>
                </li>
                { (this.state.user) ?
                    <p>Hello, {this.state.user.username}</p> :
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li> }
                <a className="nav-link" href="#">About</a>
            </ul>
        </nav>);
    }
}

export default Navbar;