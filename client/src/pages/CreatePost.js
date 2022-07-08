import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCreatePost } from "../hooks/postHook";
import { useNavigate } from "react-router-dom";

const CreatePost = (props) => {
    useEffect(() => {
        document.title = "Revisto";
    }, []);

    const MIN_CONT = 200;
    const MAX_TITLE = 75;

    const { createPost } = useCreatePost();
    const nav = useNavigate();
    const [numChars, setNumChars] = useState(MIN_CONT);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.title && form.content) {
            // Ensure correct sizes
            if (form.content.length < MIN_CONT 
                || form.title.length > MAX_TITLE) {

                return;
            }

            console.log(form.content.value);
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
        <div className="container-fluid">
            {props.user ? (
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Post</h1>
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Title"
                            id="title"
                            name="title"
                            maxLength={MAX_TITLE}
                        />
        
                        <div className="form-group">
                            <label htmlFor="content">What's Happening?</label>
                            <textarea
                                className="form-control"
                                type="text"
                                id="content"
                                name="content"
                                onChange={e => setNumChars(MIN_CONT - e.target.value.length)}
                                minLength={MIN_CONT}
                            ></textarea>
                        </div>

                        { (numChars > 0) ?
                            <p>{numChars} characters needed</p> : null
                        }
                        <button className="w-10" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <Link className="text-center" to="/login">
                    <h1>Please Login</h1>
                </Link>
            )}
        </div>
    );
};

export default CreatePost;
