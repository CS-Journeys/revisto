import React, { Component } from 'react';
<<<<<<< HEAD
import logo from '../revistoLogo.svg'
=======
import { Link } from 'react-router-dom';
import logo from '../logo-tmp.png'
>>>>>>> db088dd6db72cd98d71a0dacfb5dd1e3052c45c1

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };
    }

    render() {
        return (
<<<<<<< HEAD
        <nav class="navbar navbar-expand-sm nav-bg">
            <img src={logo} alt="Logo" className="img-fluid nav-logo" id="logo"/>
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">New</a>
=======
        <nav className="navbar navbar-expand nav-bg">
            <img src={logo} alt="Logo" className="nav-logo" id="logo"/>
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
>>>>>>> db088dd6db72cd98d71a0dacfb5dd1e3052c45c1
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