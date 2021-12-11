import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            content: this.props.content
        };
    }

    render() {
        return (<div className="col">
            <div className="card">
                <div className="card-header">{this.state.title}</div>
                <div className="card-body">
                    { (this.state.content) ? this.state.content : "No Content Found."}
                </div>
            </div>
        </div>);
    }
}

export default Post;