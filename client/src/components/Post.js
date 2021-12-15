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

        if (this.state.content.length > 150) content += " . . .";

        return (<div className="col-md-3">
            <div className="card">
                <div className="card-header">{this.state.title}</div>
                <div className="card-body">
                    { (this.state.content) ? content : "No Content Found."}
                </div>
                <div className="card-footer">
                    <a href="#" className="footer-link">See More</a>
                    <span className="footer-date">{this.state.dateCreated}</span>
                </div>
            </div>
            <br />
        </div>);
    }
}

export default Post;