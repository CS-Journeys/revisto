import React, { Component } from 'react';
import { BrowserRouter as Router, 
        Routes, 
        Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import axios from 'axios';

import Home from './pages/Home'
import Login from './pages/Login';
import LargePost from './pages/LargePost';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('/users', config)
            .then(res => {
                this.setState({ user: res.data });
                console.log("User: ", this.state.user);
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
                        <Navbar user={ this.state.user } />
                        <br />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/post/:postId' element={ <LargePost location={location} />} />
                            <Route path='/submit' element={ <CreatePost />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </div>);
    }
}

export default App;