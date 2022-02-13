import React from "react";
import { Link } from "react-router-dom";
import PostForm from "../forms/PostForm";

const CreatePost = (props) => {
    return (
        <div className="container-fluid">
            {props.user ? (
                <PostForm />
            ) : (
                <Link className="text-center" to="/login">
                    <h1>Please Login</h1>
                </Link>
            )}
        </div>
    );
};

export default CreatePost;
