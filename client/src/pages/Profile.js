import React from "react";
import PostsList from "../components/post/PostsList";
import { Link } from "react-router-dom";
import { useMyPosts } from "../services/postService";

const Profile = (props) => {
    const postFunc = useMyPosts();

    //console.log(postFunc);

    return (
        <div className="container">
            {props.user ? (
                <div>
                    {postFunc ? (
                        <div>
                            <h1 className="text-center">Your Journals</h1>
                            <PostsList postFunc={postFunc} />
                        </div>
                    ) : (
                        <h1>
                            No Posts Found, <Link to="/submit">Create One</Link>
                        </h1>
                    )}
                </div>
            ) : (
                <Link className="text-center" to="/login">
                    <h1>Please Login</h1>
                </Link>
            )}
        </div>
    );
};

export default Profile;
