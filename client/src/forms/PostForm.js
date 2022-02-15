import React from "react";
import { useCreatePost } from "../hooks/api";
import { useNavigate } from "react-router-dom";

/**
 * Form to fill out in order to create a new post
 *
 * @returns {JSX.Element} The post form component to display.
 */
const PostForm = () => {
    const { createPost } = useCreatePost();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.title && form.content) {
            //console.log(form.content.value);
            createPost(
                {
                    title: form.title.value,
                    content: form.content.value,
                },
                {
                    onSuccess: () => {
                        nav("/");
                    },
                }
            );
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                />

                <div className="form-group">
                    <label htmlFor="content">What's Happening?</label>
                    <textarea
                        className="form-control"
                        type="text"
                        id="content"
                        name="content"
                    ></textarea>
                </div>

                <button className="w-10" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostForm;
