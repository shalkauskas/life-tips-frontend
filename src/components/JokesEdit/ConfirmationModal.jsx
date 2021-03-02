import DataService from "../../services/DataService";
export default function ConfirmationModal(props) {
  const removeAllJokes = () => {
    DataService.removeAll()
      .then((response) => {
        console.log(response.data);
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div
      style={{ top: "35%", left: "0", right: "0", zIndex: "20" }}
      className={`${
        props.showConfirm ? "d-block" : "d-none"
      } position-absolute border bg-light w-sm-75 w-100 mx-auto`}
    >
      <div className="modal-header">
        <h5 className="modal-title">
          Are you sure you want to delete all your published content?
        </h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => props.setShowConfirm(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body bg-white">
        <p>This action is non-reversible and all data will be lost.</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => props.setShowConfirm(false)}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={removeAllJokes}
        >
          Confirm delete all
        </button>
      </div>
    </div>
  );
}
