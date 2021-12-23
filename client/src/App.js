import React, { Component } from 'react';
import { BrowserRouter as Router, 
        Routes, 
        Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import LargePost from './pages/LargePost'

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
        return (<div className="App container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    <Router>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/post/:postId' element={ <LargePost />} />
                            </Routes>
                    </Router>
                </div>
            </div>
        </div>);
    }
}

export default App;