import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            content: this.props.content,
            dateCreated: this.props.dateCreated
        };
    }

    render() {
        let content = this.state.content.substring(0, 150);

        return (<div className="col-md-3">
            <div className="card">
                <div className="card-header">{this.state.title}</div>
                <div className="card-body">
                    { (this.state.content) ? content : "No Content Found."}
                </div>
                <a href="#" className="card-footer">See More</a>
            </div>
                <div>
                    {this.state.dateCreated}
                </div>
            <br />
        </div>);
    }
}

export default Post;