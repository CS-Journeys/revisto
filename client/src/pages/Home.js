import React from "react";
import PostsList from "../components/post/PostsList";
import PostInput from "../components/post/PostInput";
import { usePosts } from "../services/postService";

const Home = (props) => {
    const postFunc = usePosts();

    console.log(postFunc);

    return (
        <div>
            <div className="container-fluid">
                {/* Render home page */}
                <PostInput user={props.user} />
                <PostsList postFunc={postFunc} />
            </div>
        </div>
    );
};

export default Home;
