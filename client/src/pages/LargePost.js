import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LargePost = (props) => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/id/${postId}`)
      .then(({ data }) => {
        const { err } = data;
        if (err) {
          console.log(err);
        } else {
          setPost(data.post);
        }
      })
      .catch((error) => {
        // Console log error
        console.log(`Could not get post: ${error}`);
      });
  }, []);

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
