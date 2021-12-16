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
            <img src={logo} alt="Logo" className="nav-logo" id="logo"/>
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">New</a>
                </li>
                { (this.state.user) ?
                    <p>Hello, {this.state.user.username}</p> :
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li> }
            </ul>
        </nav>);
    }
}

export default Navbar;