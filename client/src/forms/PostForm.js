import React, { Component } from "react";

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        return (<article className="form">
            <form onSubmit={this.handleSubmit}>
                <h1>Create Post</h1>
                <div className="form-control">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value }) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">What's Happening?</label>
                    <textarea className="form-control"
                        type="text"
                        id="content"
                        name="content"
                        value={this.state.content}
                        onChange={(e) => this.setState({ content: e.target.value }) }
                    ></textarea>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </article>);
    }
}

export default PostForm;