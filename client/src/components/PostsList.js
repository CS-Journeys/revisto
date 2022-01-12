import React, { Component, useState, useEffect } from "react";
import Post from "./Post";

import axios from "axios";

const PostsList = (props) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios
      .get("/posts")
      .then(({ data: { posts, err } }) => {
        if (err) {
          console.log(err);
        } else {
          setPosts(posts);
        }
      })
      .catch((error) => {
        console.error(`Could not get posts: ${error}`);
      });
  }, []);

  return (
    <div className="row d-flex justify-content-center">
      {posts && posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

class OldPostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        const { posts } = res.data;
        console.log(posts);
        this.setState({ posts });
      })
      .catch((error) => {
        console.error(`Could not get posts: ${error}`);
      });
  }

  render() {
    return (
      <div className="row d-flex justify-content-center">
        {this.state.posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
}

export default PostsList;
