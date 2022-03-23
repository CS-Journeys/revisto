import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    usePost,
    useUpdatePost,
    useDeletePost,
    useReportPost,
} from "../hooks/postHook";
import { formatContent } from "../hooks/authHook";
import ConfirmationModal from "../components/ConfirmationModal";

const NormalPost = ({ post, user, onEdit }) => {
    const { deletePost } = useDeletePost();
    const { reportPost } = useReportPost();
    const [show, setShow] = useState(false);
    const [reacted, setReact] = useState(false);

    const nav = useNavigate();

    const date = new Date(post.dateCreated).toDateString();

    const onReport = (report) => {
        reportPost(
            { id: post._id, report },
            {
                onSuccess: () => {
                    nav("/");
                },
            }
        );
    };
    const onDelete = () => {
        deletePost(post._id, {
            onSuccess: () => {
                nav("/me");
            },
        });
    };

    return (
        <div className="w-100 p-4 bg-light shadow-sm">
            <h1 className="display-4 text-center border border-top-0 
                border-left-0 border-right-0 border-dark">

                {post.title}
            </h1>

            {/* This is dangerous? Probs */}
            <p dangerouslySetInnerHTML={formatContent(post.content)} />
            <span>
                <strong>{date}</strong>

                <br />
                <br />
                { (user && !post.isMine) ? <div>
                    { (!reacted) ? 
                        <div>
                            <a>React to this!</a>
                            <br />
                            <button className="btn" onClick={() => setReact(true)}>
                                &#128512;
                            </button>
                            <button className="btn" onClick={() => setReact(true)}>
                                &#128514;
                            </button>
                            <button className="btn" onClick={() => setReact(true)}>
                                &#128562;
                            </button>
                        </div> : <a>Your reaction has been saved!</a>}
                    </div> : null
                }
            </span>
            <div className="w-100 d-flex justify-content-end">
                {post.isMine ? 
                    (<div>
                        <button className="btn btn-primary mr-2" onClick={onEdit}>
                            Edit
                        </button>
                        <button className="btn btn-secondary mr-2" onClick={() => setShow(true)}>
                            Delete
                        </button>
                        <ConfirmationModal
                            confirmText="Delete"
                            body="Deleting is irreversible."
                            title="Are you sure?"
                            onConfirm={onDelete}
                            show={show}
                            onHide={() => setShow(false)}>
                        </ConfirmationModal>
                    </div>) :
                    (<div>
                        <button className="btn btn-secondary mr-2" onClick={() => setShow(true)}>
                            Report
                        </button>
                        <ConfirmationModal
                            confirmText="Report"
                            title="Are you sure?"
                            body="Our system will take a look as soon as possible."
                            onConfirm={onReport}
                            show={show}
                            onHide={() => setShow(false)}>
                        </ConfirmationModal>
                    </div>)
                }
            </div>
        </div>
    );
};

const EditablePost = ({ post, onCancel }) => {
    const { updatePost } = useUpdatePost();
    const form = useRef();

    useEffect(() => {
        form.current.title.value = post.title;
        form.current.content.value = post.content;
    }, []);

    const onUpdate = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        
        updatePost(
            {
                id: post._id,
                title,
                content,
            },
            {
                onSuccess: () => {
                    onCancel();
                },
            }
        );
    };

    return (
        <form ref={form} onSubmit={onUpdate} className="w-100 p-4 bg-light shadow-sm">

            <input className="mb-2 bg-light text-center border border-top-0 border-left-0 
                border-right-0 border-dark w-100 display-4" name="title" />

            <textarea className="form-control" name="content" />
            <br />

            {post.isMine ? (
                <div className="w-100 d-flex justify-content-end">
                    <button className="btn btn-primary mr-2" type="submit">
                        Save
                    </button>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            ) : null}
        </form>
    );
};

const LargePost = (props) => {
    const [editing, setEditing] = useState(false);

    const { postId } = useParams();
    const { post } = usePost(postId);

    return (
        <div>
            <div className="container-fluid d-flex justify-content-center">
                {post &&
                    (!editing ? (
                        <NormalPost
                            post={post}
                            user={props.user}
                            onEdit={() => setEditing(true)}
                        />
                    ) : (
                        <EditablePost
                            post={post}
                            onCancel={() => setEditing(false)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default LargePost;
