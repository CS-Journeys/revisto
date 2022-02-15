import React from "react";
import PostsList from "../components/PostsList";
import PostInput from "../components/PostInput";
import { usePosts } from "../hooks/api";

const Home = (props) => {
    const postFunc = usePosts();

    //console.log(postFunc);

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
