import DataService from "../../services/DataService";
export default function JokesEditButtons(props) {
  const updatePublished = (status) => {
    var data = {
      id: props.currentJoke.id,
      title: props.currentJoke.title,
      description: props.currentJoke.description,
      published: status,
    };

    DataService.update(props.currentJoke.id, data)
      .then((response) => {
        props.setCurrentJoke({ ...props.currentJoke, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteJoke = () => {
    DataService.remove(props.currentJoke.id)
      .then((response) => {
        console.log(response.data);
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateJoke = () => {
    DataService.update(props.currentJoke.id, props.currentJoke)
      .then((response) => {
        console.log(response.data);
        props.setMessage("Your content was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    props.setEdit(!props.edit);
  };
  return (
    <>
      {props.edit ? (
        <div>
          {props.adminRole ? (
            props.currentJoke.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )
          ) : null}

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateJoke}
          >
            Save
          </button>
          <button
            type="submit"
            className="badge badge-warning mx-2"
            onClick={() => props.setEdit(false)}
          >
            Cancel
          </button>
          <button className="badge badge-danger mr-2" onClick={deleteJoke}>
            Delete
          </button>
        </div>
      ) : (
        <button
          onClick={() => props.setEdit(!props.edit)}
          className="badge badge-warning"
        >
          Edit
        </button>
      )}
    </>
  );
}
