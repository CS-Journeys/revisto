import React, { Component } from 'react';
import logo from '../revistoLogo.svg'

class Navbar extends Component {

    render() {
        return (
        <nav class="navbar navbar-expand-sm nav-bg">
            <img src={logo} alt="Logo" className="img-fluid nav-logo" id="logo"/>
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">New</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Settings</a>
                </li>
            </ul>
        </nav>);
    }
}

export default Navbar;