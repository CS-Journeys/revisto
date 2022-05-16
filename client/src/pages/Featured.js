import React from "react";
import PostsList from "../components/post/PostsList";
import { usePosts } from "../hooks/postHook";

const Featured = () => {
    const attrib = "reactionCount";
    const posts = usePosts({ sortAttribute : attrib });

    return (
        <div>
            <div className="container-fluid">
                <h1 className="display-4 text-center">Featured</h1>
                <PostsList posts={posts} />
            </div>
        </div>
    );
};

export default Featured;
