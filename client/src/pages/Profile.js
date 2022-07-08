import React, { useEffect } from "react";
import PostsList from "../components/post/PostsList";
import { Link } from "react-router-dom";
import { useMyPosts } from "../hooks/postHook";

const Profile = (props) => {
    useEffect(() => {
        document.title = "Revisto - Profile";
    }, []);

    const posts = useMyPosts();

    return (
        <div className="container">
            {props.user ? (
                <div>
                    {posts ? (
                        <div>
                            <h1 className="text-center">Your Journals</h1>
                            <PostsList posts={posts} />
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
