import React, { Component } from "react";
import { Link } from "react-router-dom";

/*
 * Each Post in the databse has:
 *  _id: id of the collection
 *  title: title of the post
 *  content: content of the post
 *  dateCreated: date post was created
 */

const Post = ({ post }) => {
  const formatDate = date => {
    return new Date(date)
      .toDateString()
      .slice(0, -5);
  };
  let content = post.content.slice(0, 150);
  if (content.length < post.content.length) {
    content += "...";
  }
  const url = `/post/${post._id}`;
  return (
    <div className="col-md-5">
      <div className="card">
        <div className="card-header">{post.title}</div>
        <div className="card-body">
          {post.content ? content : "No Content Found."}
        </div>
        <div className="card-footer">
          <Link className="footer-link" to={{ pathname: url, state: { post } }}>
            See More
          </Link>

          <span className="footer-date">{formatDate(post.dateCreated)}</span>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Post;
