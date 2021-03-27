import DataService from "../../services/DataService";
export default function PostsEditAllButtons(props) {
  const publishAllPosts = () => {
    DataService.updateMany()
      .then((response) => {
        console.log(response.data);
        // replace with context
        // props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="text-center">
      {props.adminRole && props.posts.length > 1 ? (
        <>
          <button
            className="m-3 btn btn-sm btn-success"
            onClick={publishAllPosts}
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
      ) : props.posts.length > 1 ? (
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
