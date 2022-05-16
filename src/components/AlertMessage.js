import React from "react";

export default function AlertMessage(props) {
  return (
    <div>
      <div className="alert alert-success alert-dismissible" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.handleClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {props.message}
      </div>
    </div>
  );
}
