import React from 'react';
import axios from 'axios';

class PostsList extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
        .then(res => {
            const posts = res.data;
            console.log(posts);
            this.setState({ posts });
        })
        .catch(error => {
            console.error(`Could not get posts: ${error}`);
        });
    }

    render() {
        return (
        <ul>
            { this.state.posts.map(post => <li>{post.title}</li>) }
        </ul>
        )
    }
}

export default PostsList;