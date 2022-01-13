import React, { Component } from 'react';

import axios from 'axios';

class LargePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null
        }
    }
    
    // NOTE: There is probably a better way than this
    componentDidMount() {
        let path = this.props.location.pathname;
        path = path.replace("/post/", "/posts/id/");

        // Load current user (if exists)
        axios.get(path)
        .then(res => {
            const {post} = res.data;
            this.setState({ post });
        })
        .catch(error => { // Console log error
            console.log(`Could not get post: ${error}`);
        });
    }

    render() {
        const post = this.state.post;

        return (<div>
            <div className="container-fluid">
                { (post)? <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div> : null }
            </div>
        </div>);
    }
}

export default LargePost;