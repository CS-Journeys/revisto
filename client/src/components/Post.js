import React from "react";
import { Link } from "react-router-dom";
import MarkdownView from "react-showdown";
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

  const url = `/post/${post._id}`;
  return (
    <div className="col-md-5">
      <div className="card">
        <div className="card-header">{post.title}</div>
        <div className="card-body c-body-dim">
          {post.content ? (
            <MarkdownView
              markdown={post.content}
              options={{
                simpleLineBreaks: true,
                openLinksInNewWindow: true,
                emoji: true,
              }}
            />
          ) : (
            "No Content Found."
          )}
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
