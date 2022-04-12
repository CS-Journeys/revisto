import React from "react";
import Post from "./Post";

/**
 * Component to get the posts to be displayed.
 *
 * @param {Function} postFunc The function to get the posts (usePosts())
 * @returns {JSX.Element} The posts to be displayed
 */
const PostsList = (props) => {
    const { posts } = props.posts;

    return (
        <div className="row d-flex justify-content-center">
            {posts && posts.map((post) => <Post key={post._id} post={post} />)}
        </div>
    );
};

export default PostsList;
