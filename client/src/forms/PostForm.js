import React from "react";
import { useCreatePost } from "../hooks/api";
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const { createPost } = useCreatePost();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.title && form.content) {
      createPost({
        title: form.title.value,
        content: form.content.value
      }, {
        onSuccess: () => {
          nav("/");
        }
      });
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <div className="form-control">
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="form-group">
          <label htmlFor="content">What's Happening?</label>
          <textarea className="form-control" type="text" id="content" name="content"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default PostForm;
