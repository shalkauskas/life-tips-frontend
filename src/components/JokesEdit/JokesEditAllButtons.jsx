import DataService from "../../services/DataService";
export default function JokesEditAllButtons(props) {
  const publishAllJokes = () => {
    DataService.updateMany()
      .then((response) => {
        console.log(response.data);
        props.refreshList();
        props.setMessage("All jokes have been published!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="text-center">
      {props.adminRole && props.jokes.length > 1 ? (
        <>
          <button
            className="m-3 btn btn-sm btn-success"
            onClick={publishAllJokes}
          >
            Publish All
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={() => props.setShowConfirm(true)}
          >
            Remove All
          </button>
        </>
      ) : props.jokes.length > 1 ? (
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={() => props.setShowConfirm(true)}
        >
          Remove All
        </button>
      ) : null}
    </div>
  );
}
