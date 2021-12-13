import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo-tmp.png'

class Navbar extends Component {
    render() {
        return (
        <nav class="navbar navbar-expand nav-bg">
            <img src={logo} alt="Logo" className="nav-logo" id="logo"/>
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">New</a>
                </li>
                <li class="nav-item">
                <Link class="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        </nav>);
    }
}

export default Navbar;