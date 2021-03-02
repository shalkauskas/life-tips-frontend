export default function UpdateConfirmation(props) {
  return (
    <div
      style={{ top: "35%", left: "0", right: "0", zIndex: "20" }}
      className={`${
        props.showConfirm ? "d-block" : "d-none"
      } position-absolute border bg-light mx-auto`}
    >
      <div className="modal-header bg-success">
        <div className="pl-5 text-center">
          <img
            src="/check.svg"
            alt="Success"
            width="70px"
            height="70px"
            className=""
          />
        </div>

        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => props.setShowConfirm(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body text-center bg-light py-4">
        <h5 className="modal-title">
          Your profile has been successfully updated!
        </h5>
      </div>
    </div>
  );
}
