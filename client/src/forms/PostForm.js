import React from "react";
import { useCreatePost } from "../hooks/api";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "../components/MarkdownEditor";
const PostForm = () => {
  const { createPost } = useCreatePost();
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.title && form.content) {
      console.log(form.content.value);
      createPost(
        {
          title: form.title.value,
          content: form.content.value,
        },
        {
          onSuccess: () => {
            nav("/");
          },
        }
      );
    }
  };

  return (
    <form className="container bg-white" onSubmit={handleSubmit}>
      <h1>Create Post</h1>
      <input className="form-control form-control-lg" type="text" placeholder="Title" id="title" name="title" />
      <div className="form-group">
        <label htmlFor="content">What's Happening?</label>
        <MarkdownEditor/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
