import React, { Component } from 'react';
import logo from '../revistoLogo.svg'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this.setState({ user: this.props.user.user });
        }
    }

    render() {
        const user = this.state.user;

        return (<div className="nav-control">
            <nav className="navbar navbar-expand-lg navbar-light nav-bg">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Logo" id="logo"/>
                </Link>

                {/* Mobile Button */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" 
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav navbar-left" >
                        <Link className="nav-link" to="#"><h4>Featured</h4></Link>
                        <Link className="nav-link" to="#"><h4>About</h4></Link>
                    </div>
                    { (user != null) ?
                            <p className="nav-link">Hello, {user.email}</p> :
                            <div className="navbar-nav navbar-right">
                                <Link className="nav-link" to="#"><span>Sign Up</span></Link>
                                <Link className="nav-link" to="/login"><span>Login</span></Link>
                            </div>}
                </div>
                
            </nav>
        </div>);
    }
}

export default Navbar;