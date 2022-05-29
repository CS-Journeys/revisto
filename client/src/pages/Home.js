import React from "react";
import PostsList from "../components/post/PostsList";
import PostInput from "../components/post/PostInput";
import { usePosts } from "../hooks/postHook";
import useWindowScrollPosition from "../hooks/scrollHook";

const Home = (props) => {
    const attrib = "dateCreated";
    const posts = usePosts({ sortAttribute : attrib });

    // TODO: make it work better, rn its glitchy woops
    useWindowScrollPosition("home_scrollY", !posts.isFetching);

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
