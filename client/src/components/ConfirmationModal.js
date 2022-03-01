import React from "react";
import { useRef } from "react";

const ConfirmationModal = ({
    style = "primary",
    confirmText = "Yes",
    body = "",
    title = "",
    children,
    onConfirm,
    context = false,
}) => {
    const btnClass = `btn btn-${style}`;
    const ctx = useRef();
    const handleCLick = () => {
        if (context) {
            return onConfirm(ctx.current.value);
        }
        return onConfirm();
    };
    return (
        <div>
            <button
                type="button"
                className={btnClass}
                data-toggle="modal"
                data-target="#exampleModal"
            >
                {children}
            </button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="Delete"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {context ? (
                                <textarea ref={ctx} className="w-100 h-100" />
                            ) : (
                                body
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={handleCLick}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
