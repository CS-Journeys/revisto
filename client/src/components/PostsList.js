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
        return (
        <div className="row">
            { this.state.posts.map(post => <Post title={post.title} content={post.content}/>)  }
        </div>
        )
    }
}

export default PostsList;