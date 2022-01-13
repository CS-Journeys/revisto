import React from "react";
import PostsList from "../components/PostsList";
import PostInput from "../components/PostInput";

const Home = (props) => {
  return (
    <div>
      <div className="container-fluid">
        {/* Render home page */}
        <PostInput user={props.user} />
        <PostsList />
      </div>
    </div>
  );
};

export default Home;
