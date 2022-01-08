import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import CreatePost from '../components/CreatePost';

class Home extends Component {
    render() {
        return (<div>
            <div className="container-fluid">
                {/* Render home page */}
                <CreatePost />
                <PostsList/>
            </div>
        </div>);
    }
}

export default Home;