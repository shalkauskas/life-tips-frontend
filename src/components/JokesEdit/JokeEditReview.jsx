import React, { useState } from "react";
import JokesEditButtons from "./JokeEditButtons";

export default function JokeEditReview(props) {
  const [edit, setEdit] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setCurrentJoke({ ...props.currentJoke, [name]: value });
  };
  return (
    <div className="col-lg-8 col-xl-4 col-12">
      <div className="mb-sm-4">
        <h4 className="text-center">Review or change</h4>
      </div>
      {props.currentJoke ? (
        <div className="p-4 border">
          {edit ? (
            <div className="form-group">
              <textarea
                type="text"
                rows="6"
                className="form-control"
                id="description"
                name="content"
                value={props.currentJoke.content}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div>{props.currentJoke.content}</div>
          )}

          <div className="mt-2">
            <label>
              <strong>Author:</strong>
            </label>{" "}
            {props.currentJoke.author}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {props.currentJoke.published ? "Published" : "Pending"}
          </div>
          <div
            className={`alert alert-success ${
              props.message.length < 1 ? "d-none" : "d-block"
            }`}
          >
            <button
              className="close p-1 position-absolute"
              style={{ right: "0", top: "0" }}
              aria-label="Close"
              onClick={() => props.setMessage("")}
            >
              <span aria-hidden="true" className="">
                &times;
              </span>
            </button>
            <p className="lead text-secondary ">{props.message}</p>
          </div>
          <JokesEditButtons
            edit={edit}
            setEdit={setEdit}
            adminRole={props.adminRole}
            currentJoke={props.currentJoke}
            setCurrentJoke={props.setCurrentJoke}
            refreshList={props.refreshList}
            setMessage={props.setMessage}
          />
        </div>
      ) : (
        <div>
          <p className="lead text-danger text-center">{props.message}</p>
          <p className="text-center my-5 alert alert-info">
            Please select a joke to edit...
          </p>
        </div>
      )}
    </div>
  );
}
