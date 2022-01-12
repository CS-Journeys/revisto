import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePost } from "../hooks/api";

const LargePost = (props) => {
  const { postId } = useParams();
  const { post } = usePost(postId);

  return (
    <div>
      <div className="container-fluid">
        {post ? (
          <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LargePost;
