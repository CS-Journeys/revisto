import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import PostInput from '../components/PostInput';

class Home extends Component {
    render() {
        return (<div>
            <div className="container-fluid">
                {/* Render home page */}
                <PostInput user={this.props.user} />
                <PostsList/>
            </div>
        </div>);
    }
}

export default Home;