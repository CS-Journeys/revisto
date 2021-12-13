import React, { Component } from 'react';
import { BrowserRouter as Router, 
        Routes, 
        Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

class App extends Component {
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