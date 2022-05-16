import React from "react";
import { useRef } from "react";
import { Modal } from "react-bootstrap";

const ConfirmationModal = (props) => {
    const ctx = useRef();
    const onConfirm = props.onConfirm;
    const onHide = props.onHide;
    let res;

    const handleClick = () => {
        if (props.context) {
            res = onConfirm(ctx.current.value);
            onHide();
            return res;
        }
        res = onConfirm();
        onHide();
        return res;
    };

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.onHide}>
            <Modal.Header><Modal.Title>{props.title}</Modal.Title></Modal.Header>
            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>

            { (props.showFooter) ?
                <Modal.Footer>
                    <button className="btn btn-secondary" variant="secondary" onClick={props.onHide}>
                        Close
                    </button>
                    <button className={"btn " + props.buttonType} variant="primary" onClick={handleClick}>
                        {props.confirmText}
                    </button>
                </Modal.Footer>
            : null }
        </Modal>
    );
};

export default ConfirmationModal;
