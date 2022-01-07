import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Navbar from '../components/Navbar';

class Home extends Component {
    render() {
        return (<div>
            <br/>
            <div className="container-fluid">
                {/* Render home page */}
                <PostsList/>
            </div>
        </div>);
    }
}

export default Home;