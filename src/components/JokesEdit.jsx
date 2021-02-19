import React, { useState, useEffect } from "react";
import DataService from "../services/DataService";
import Joke from "./Joke";

export default function JokesEdit(props) {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [dropdown, setDropdown] = useState(false);
  JokesEdit.defaultProps = {
    admin: false,
  };
  const retrieveTutorials = React.useCallback(() => {
    DataService.getAll()
      .then((response) => {
        setJokes(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    retrieveTutorials();
  }, [retrieveTutorials, message]);
  useEffect(() => {
    setJokes(props.jokes);
  }, [props.jokes]);

  const refreshList = () => {
    retrieveTutorials();
    setCurrentJoke(null);
    setCurrentIndex(-1);
  };

  const setActiveJoke = (joke, index) => {
    setCurrentJoke(joke);
    setCurrentIndex(index);
    setMessage("");
  };

  const removeAllTutorials = () => {
    DataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const publishAllJokes = () => {
    DataService.updateMany()
      .then((response) => {
        console.log(response.data);
        refreshList();
        setMessage("All jokes have been published!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentJoke({ ...currentJoke, [name]: value });
  };
  const updateJoke = () => {
    DataService.update(currentJoke.id, currentJoke)
      .then((response) => {
        console.log(response.data);
        setMessage("Your content was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    setEdit(!edit);
  };
  const updatePublished = (status) => {
    var data = {
      id: currentJoke.id,
      title: currentJoke.title,
      description: currentJoke.description,
      published: status,
    };

    DataService.update(currentJoke.id, data)
      .then((response) => {
        setCurrentJoke({ ...currentJoke, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteJoke = () => {
    DataService.remove(currentJoke.id)
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const orderPublished = [...jokes].sort((a, b) =>
    a.published === b.published ? 0 : a.published ? -1 : 1
  );
  const orderUnPublished = [...jokes].sort((a, b) =>
    a.published === b.published ? 0 : a.published ? 1 : -1
  );
  const orderNewest = [...jokes].sort((a, b) => (a.time < b.time ? 1 : -1));
  const orderOldest = [...jokes].sort((a, b) => (a.time > b.time ? 1 : -1));
  const orderBest = [...jokes].sort((a, b) => (a.rating < b.rating ? 1 : -1));
  const orderWorst = [...jokes].sort((a, b) => (a.rating < b.rating ? -1 : 1));
  const orderAuthor = [...jokes].sort((a, b) => (a.author < b.author ? 1 : -1));
  return (
    <div className="d-flex flex-row flex-wrap-reverse justify-content-center bg-light p-3">
      <div className="col-lg-6 col-12">
        <div className="d-flex justify-content-center my-3">
          <h4 className="text-center">
            {props.admin ? "All jokes" : "My Jokes"}
          </h4>
          <div className="dropdown ml-4">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="btn btn-sm btn-info dropdown-toggle"
              type="button"
            >
              Sort
            </button>
            <div className={`${dropdown ? "d-block" : ""} dropdown-menu`}>
              <button
                className="dropdown-item"
                onClick={() =>
                  JSON.stringify(jokes) === JSON.stringify(orderUnPublished)
                    ? setJokes(orderPublished)
                    : setJokes(orderUnPublished)
                }
              >
                Published
              </button>
              <button
                className="dropdown-item"
                onClick={() =>
                  JSON.stringify(jokes) === JSON.stringify(orderOldest)
                    ? setJokes(orderNewest)
                    : setJokes(orderOldest)
                }
              >
                Date
              </button>
              <button
                className="dropdown-item"
                onClick={() =>
                  JSON.stringify(jokes) === JSON.stringify(orderWorst)
                    ? setJokes(orderBest)
                    : setJokes(orderWorst)
                }
              >
                Rating
              </button>
              <button
                className="dropdown-item"
                onClick={() => setJokes(orderAuthor)}
              >
                By author
              </button>
            </div>
          </div>
        </div>

        <div
          className="border p-3"
          style={{
            height: "70vh",
            overflowY: "auto",
            direction: "rtl",
          }}
        >
          {jokes.map((joke, index) => (
            <div
              key={index}
              onClick={() => setActiveJoke(joke, index)}
              style={{ direction: "ltr" }}
              className={`
              ${index === currentIndex ? "border border-warning " : ""} mb-3`}
            >
              <Joke
                content={joke.content}
                author={joke.author}
                id={joke.id}
                rating={joke.rating}
                time={joke.time}
                allowRate={false}
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          {props.admin ? (
            <button
              className="m-3 btn btn-sm btn-success"
              onClick={publishAllJokes}
            >
              Publish All
            </button>
          ) : null}
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllTutorials}
          >
            Remove All
          </button>
        </div>
      </div>

      <div className="col-lg-8 col-xl-4 col-12">
        <div className="mb-sm-4">
          <h4 className="text-center">Review or change</h4>
        </div>
        {currentJoke ? (
          <div className="p-4 border">
            {edit ? (
              <div className="form-group">
                <textarea
                  type="text"
                  rows="6"
                  className="form-control"
                  id="description"
                  name="content"
                  value={currentJoke.content}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div>{currentJoke.content}</div>
            )}

            <div className="mt-2">
              <label>
                <strong>Author:</strong>
              </label>{" "}
              {currentJoke.author}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentJoke.published ? "Published" : "Pending"}
            </div>
            <p className="lead text-danger">{message}</p>
            {edit ? (
              <div>
                {props.admin ? (
                  currentJoke.published ? (
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
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="badge badge-danger mr-2"
                  onClick={deleteJoke}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEdit(!edit)}
                className="badge badge-warning"
              >
                Edit
              </button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-center my-5">Please select...</p>
          </div>
        )}
      </div>
    </div>
  );
}
