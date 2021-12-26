import React, { Component } from 'react';
import { BrowserRouter as Router, 
        Routes, 
        Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

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
        // WILL FAIL: Need's user parameters (auth)
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
        // NOTE: There is prolly a better way than this
        const history = createBrowserHistory();

        return (<div className="App container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    <Router location={history.location} navigator={history}>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/post/:postId' element={ <LargePost location={location} />} />
                            </Routes>
                    </Router>
                </div>
            </div>
        </div>);
    }
}

export default App;