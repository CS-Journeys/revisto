import React, { Component } from 'react';
import { BrowserRouter as Router, 
        Routes, 
        Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Home from './pages/Home'
import Login from './pages/Login';
import LargePost from './pages/LargePost';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';

import { loadUser } from './auth';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.setState({ user: loadUser(localStorage.getItem("token")) }, () => {
            console.log(this.state.user);
        });

        // Setstate is asynchronous, navbar is not updating
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