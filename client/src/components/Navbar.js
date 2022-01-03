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
        return (<div className="nav-control">
            <nav className="navbar navbar-expand nav-bg">
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Logo" id="logo"/>
                </Link>
                <div className="nav navbar-nav navbar-left">
                    <Link className="nav-link" to="#"><h4>New</h4></Link>
                    <Link className="nav-link" to="#"><h4>About</h4></Link>
                </div >
                { (this.state.user) ?
                        <p>Hello, {this.state.user.username}</p> :
                        <div className="nav navbar-nav navbar-right">
                            <NavBtn text="Sign In" link="#" />
                            <NavBtn text="Login" link="/login" />
                        </div>}
            </nav>
        </div>);
    }
}

class NavBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            link: this.props.link,
            color: null
        };
    }

    render() {
        switch (this.state.text) {
            case "Sign In":
                this.state.color = "btn-signin";
                break;
            case "Login":
                this.state.color = "btn-login";
                break;
        }

        let btnClass = "btn " + this.state.color + " nav-link";

        return (<button type="button" className={btnClass}>
            <Link to={this.state.link}>
                {this.state.text}
                </Link>
            </button>);
    }
}

export default Navbar;