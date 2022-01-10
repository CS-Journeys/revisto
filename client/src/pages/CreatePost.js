import React, { Component } from "react";
import PostForm from "../forms/PostForm";

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        }
    }

    setClickEvent() {
        clicked = !clicked;
    }

    render() {
        return (
            <div className="container">
                <PostForm />
            </div>
        );
    }
}

export default CreatePost;