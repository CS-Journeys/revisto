import React, { useEffect } from "react";
import PostsList from "../components/post/PostsList";
import { usePosts } from "../hooks/postHook";

const Featured = (props) => {
    const attrib = "reactionCount";
    const posts = usePosts({ sortAttribute : attrib });

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
