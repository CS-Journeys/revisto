import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePost, useUpdatePost, useDeletePost } from "../hooks/api";
import { useNavigate } from "react-router-dom";

const NormalPost = ({ post, onEdit }) => {
  const { deletePost } = useDeletePost();
  const nav = useNavigate();

  const date = new Date(post.dateCreated).toDateString();

  const onDelete = () => {
    deletePost(post._id, {
      onSuccess: () => {
        nav("/");
      }
    });
  }

  return (
    <div className="w-100 p-4 bg-light shadow-sm">
      <h1 className="display-4 text-center border border-top-0 border-left-0 border-right-0 border-dark">
        {post.title}
      </h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
      <span><strong>{date}</strong></span>
      {post.isMine ? (
        <div className="w-100 d-flex justify-content-end">
          <button className="btn btn-primary mr-2" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-secondary" onClick={onDelete}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

const EditablePost = ({ post, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const date = post.dateCreated;
  const textRef = useRef();

  const { updatePost } = useUpdatePost();

  useEffect(() => {
    textRef.current.style.height = "1px";
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, []);

  const onType = (e) => {
    setContent(e.target.value);
    //resize textarea to fit content
    e.target.style.height = "1px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onUpdate = (e) => {
    updatePost({
      id: post._id,
      title,
      content,
    }, {
      onSuccess: () => {
        onCancel();
      }
    });
  };

  return (
    <div className="w-100 p-4 bg-light shadow-sm">
      <input
        className="mb-2 bg-light text-center border border-top-0 border-left-0 border-right-0 border-dark w-100 display-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        ref={textRef}
        className="w-100 bg-light overflow-hidden"
        style={{ resize: "none" }}
        value={content}
        onChange={onType}
      />
      {post.isMine ? (
        <div className="w-100 d-flex justify-content-end">
          <button className="btn btn-primary mr-2" onClick={onUpdate}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};

const LargePost = () => {
  const [editing, setEditing] = useState(false);

  const { postId } = useParams();
  const { post } = usePost(postId);

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center">
        {post &&
          (
            !editing ?
              <NormalPost post={post} onEdit={() => setEditing(true)} />
            : <EditablePost post={post} onCancel={() => setEditing(false)} />
          )}
      </div>
    </div>
  );
};

export default LargePost;
