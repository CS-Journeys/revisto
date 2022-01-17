import React from "react";
import Post from "./Post";

const PostsList = ({ postFunc }) => {
  const { posts } = postFunc;

  return (
    <div className="row d-flex justify-content-center">
      {posts && posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
