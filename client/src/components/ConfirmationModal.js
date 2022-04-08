import React from "react";
import { useRef } from "react";
import { Modal } from "react-bootstrap";

const ConfirmationModal = (props) => {
    const ctx = useRef();
    const onConfirm = props.onConfirm;

    const handleClick = () => {
        if (props.context) {
            return onConfirm(ctx.current.value);
        }
        return onConfirm();
    };

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.onHide}>
            <Modal.Header><Modal.Title>{props.title}</Modal.Title></Modal.Header>
            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" variant="secondary" onClick={props.onHide}>
                    Close
                </button>
                <button className="btn btn-danger" variant="primary" onClick={handleClick}>
                    {props.confirmText}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
