import React from "react";
import { useRef } from "react";

const ConfirmationModal = ({style="primary",confirmText="Yes",body="",title="",children,onConfirm,context=false}) => {
  const btnClass = `btn btn-${style}`;
  const ctx = useRef();
  const handleCLick = () => {
    if (context) {
      return onConfirm(ctx.current.value);
    }
    return onConfirm();
  }
  return (
    <div>
      <button
        type="button"
        class={btnClass}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {children}
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="Delete"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {context ? <textarea ref={ctx} className="w-100 h-100" /> : body}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
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
}

export default ConfirmationModal;