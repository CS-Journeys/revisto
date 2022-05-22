import React from "react";
import { Link } from "react-router-dom";
import ReactionIcon from "../ReactionIcon";
import StyledParagraph from "../StyledParagraph";

/**
 * A post object in revisto.
 * @typedef Post
 * @type {Object}
 * @property {Number} _id - id of the collection
 * @property {String} title - title of the post
 * @property {String} content - content of the post
 * @property {Date} dateCreated - date post was created
 * @property {String} topReaction - the top reaction to the post
 */

/**
 * Allows for markdown editing within posts.
 * @param  {Post} post      The initial text within the markdown.
 * @return {SimpleMDE}      The updated markdown text
 */
const Post = ({ post }) => {
    const formatDate = (date) => {
        return new Date(date).toDateString().slice(0, -5);
    };

    const url = `/post/${post._id}`;
    return (
        <div className="col-md-5">
            <div className="card">
                <div className="card-header">{post.title}</div>
                <div className="card-body c-body-dim">
                   <StyledParagraph className="card-text" content={post.content}/>
                </div>
                <div className="card-footer">
                    <Link
                        className="footer-link"
                        to={{ pathname: url, state: { post } }} >
                        See More
                    </Link>
                    <div className="footer-footer">
                        <span className="footer-date">
                            {formatDate(post.dateCreated)}
                        </span>
                        <div className="footer-reaction">
                            {post.topReaction ?
                                <ReactionIcon reaction={post.topReaction} />
                                : null}
                        </div>
                    </div>

                </div>
            </div>
            <br />
        </div>
    );
};

export default Post;
