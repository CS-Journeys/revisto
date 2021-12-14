import React, { Component } from 'react';
import { BrowserRouter as Router, 
        Routes, 
        Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: []
        };
    }

    componentDidMount() {
        // Load current user (if exists)
        axios.get('/users')
        .then(res => {
            const {user} = res.data;
            console.log(user);
            this.setState({ user });
        })
        .catch(error => { // Console log error
            console.log(`Could not get user: ${error}`);
        });
    }

    /*
     * render()
     *
     * Renders the components
    */
    render() {
        return (
        <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
        </Router>);
    }
}

export default App;