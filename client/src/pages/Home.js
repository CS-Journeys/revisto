import React from "react";
import PostsList from "../components/post/PostsList";
import PostInput from "../components/post/PostInput";
import { usePosts } from "../hooks/postHook";

const Home = (props) => {
    const attrib = "dateCreated";
    const posts = usePosts({ sortAttribute : attrib });

    return (
        <div>
            <div className="container-fluid">
                {/* Render home page */}
                <PostInput user={props.user} />
                <PostsList posts={posts} />
            </div>
        </div>
    );
};

export default Home;
