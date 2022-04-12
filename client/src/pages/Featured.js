import React from "react";
import PostsList from "../components/post/PostsList";
import { usePosts } from "../hooks/postHook";

const Featured = (props) => {
    const posts = usePosts({ sortAttribute : "reactionCount" });

    return (
        <div>
            <div className="container-fluid">
                <h1 className="text-center">Featured</h1>
                <PostsList posts={posts} />
            </div>
        </div>
    );
};

export default Featured;
