import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    usePost,
    useUpdatePost,
    useDeletePost,
    useReportPost,
    useReactPost,
} from "../hooks/postHook";
import ConfirmationModal from "../components/ConfirmationModal";
import ReactionIcon from "../components/ReactionIcon";
import Reactions from "../reactions";
import { Button } from "react-bootstrap";
import StyledParagraph from "../components/StyledParagraph";

const NormalPost = ({ post, user, onEdit }) => {
    useEffect(() => {
        document.title = "Revisto";
    }, []);

    const { deletePost } = useDeletePost();
    const { reportPost } = useReportPost();
    const { reactPost } = useReactPost();

    const [show, setShow] = useState(false);
    const [reaction, setReaction] = useState(null);

    const nav = useNavigate();

    const date = new Date(post.dateCreated).toDateString();
    const reactionsList = [
        Reactions.ENCOURAGING,
        Reactions.FUNNY,
        Reactions.SHOCKING,
        Reactions.THOUGHTPROVOKING,
        Reactions.RELATABLE,
    ];

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
    const onReact = (reaction) => {
        reactPost(
            { id: post._id, reaction },
            {
                onSuccess: () => setReaction(reaction),
            }
        );
    };

    return (
        <div className="container w-100 p-4 bg-light shadow-sm">
            {post.topReaction ? (
                <ReactionIcon reaction={post.topReaction} />
            ) : null}
            <p
                className="lg-p-header display-4 text-center border border-top-0 
                border-left-0 border-right-0 border-dark"
            >
                {post.title}
            </p>
            
            <StyledParagraph content={post.content} className="lg-p-content" />

            <span>
                <strong>{date}</strong>

                <br />
                <br />
                {user && !post.isMine ? (
                    <div>
                        <a>React to this!</a>
                        <br />
                        {reactionsList.map((reactionListItem) => (
                            <Button
                                key={reactionListItem}
                                className="btn"
                                variant="light"
                                onClick={() => onReact(reactionListItem)}
                                active={
                                    (post.reaction == reactionListItem &&
                                        !reaction) ||
                                    reaction == reactionListItem
                                }
                            >
                                <ReactionIcon
                                    reaction={reactionListItem}
                                    highlighted={post.reaction || reaction}
                                />
                            </Button>
                        ))}
                    </div>
                ) : null}
            </span>
            <div className="w-100 d-flex justify-content-end">
                {post.isMine ? (
                    <div>
                        <button
                            className="btn btn-primary mr-2"
                            onClick={onEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={() => setShow(true)}
                        >
                            Delete
                        </button>
                        <ConfirmationModal
                            confirmText="Delete"
                            body="Deleting is irreversible."
                            title="Are you sure?"
                            onConfirm={onDelete}
                            show={show}
                            onHide={() => setShow(false)}
                            buttonType="btn-danger"
                            showFooter={true}
                        ></ConfirmationModal>
                    </div>
                ) : (
                    <div>
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={() => setShow(true)}
                        >
                            <ReactionIcon reaction="Report" />
                        </button>
                        <ConfirmationModal
                            confirmText="Report"
                            title="Are you sure?"
                            body="Our system will take a look as soon as possible."
                            onConfirm={onReport}
                            show={show}
                            onHide={() => setShow(false)}
                            buttonType="btn-danger"
                            showFooter={true}
                        ></ConfirmationModal>
                    </div>
                )}
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
        <form
            ref={form}
            onSubmit={onUpdate}
            className="w-100 p-4 bg-light shadow-sm"
        >
            <input
                className="mb-2 bg-light text-center border border-top-0 border-left-0 
                border-right-0 border-dark w-100 display-4"
                name="title"
            />

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
