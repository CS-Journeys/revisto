import React from "react";
import Post from "./Post";

import { usePosts } from "../hooks/api";

const PostsList = (props) => {
  const {posts} = usePosts();

  return (
    <div className="row d-flex justify-content-center">
      {posts && posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
