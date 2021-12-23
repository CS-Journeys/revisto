import React, { Component } from 'react';
import Post from './Post';

import axios from 'axios';

class PostsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get('/posts')
        .then(res => {
            const {posts} = res.data;
            console.log(posts);
            this.setState({ posts });
        })
        .catch(error => {
            console.error(`Could not get posts: ${error}`);
        });
    }

    render() {
        return (<div className="row d-flex justify-content-center">
            { this.state.posts.map(post => <Post post={post}/>) }  
        </div>);
    }
}

export default PostsList;