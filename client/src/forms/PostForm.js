import React from "react";

const PostForm = () => {

  return (
    <div className="form">
      <form>
        <h1>Create Post</h1>
        <div className="form-control">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">What's Happening?</label>
          <textarea
            className="form-control"
            type="text"
            id="content"
            name="content"
          ></textarea>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default PostForm;
