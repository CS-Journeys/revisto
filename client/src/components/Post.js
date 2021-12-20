import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
 * Each Post in the databse has:
 *  _id: id of the collection
 *  title: title of the post
 *  content: content of the post
 *  dateCreated: date post was created
*/


class Post extends Component {
    constructor(props) {
        super(props);

        let dateCreated = new Date(this.props.post.dateCreated).toDateString().slice(0, -5);

        this.state = {
            title: this.props.post.title,
            content: this.props.post.content,
            dateCreated: dateCreated,
            id: this.props.post._id
        };
    }

    render() {
        let content = this.state.content.substring(0, 150);
        let url = "/post/" + this.state.id;

        if (this.state.content.length > 150) content += " . . .";

        return (<div className="col-md-3">
            <div className="card">
                <div className="card-header">{this.state.title}</div>
                <div className="card-body">
                    { (this.state.content) ? content : "No Content Found."}
                </div>
                <div className="card-footer">
                    <Link className="footer-link" to={url}>See More</Link>
                    <span className="footer-date">{this.state.dateCreated}</span>
                </div>
            </div>
            <br />
        </div>);
    }
}

export default Post;