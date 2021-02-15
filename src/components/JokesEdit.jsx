import React, { useState, useEffect } from "react";
import DataService from "../services/DataService";
import Joke from "./Joke";

export default function JokesEdit(props) {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const retrieveTutorials = React.useCallback(() => {
    DataService.getAll()
      .then((response) => {
        setJokes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    retrieveTutorials();
  }, [retrieveTutorials, message]);

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
  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>My Jokes</h4>
        {jokes.map((joke, index) => (
          <div
            key={index}
            onClick={() => setActiveJoke(joke, index)}
            className={`
              ${index === currentIndex ? "border border-warning " : ""} mb-3`}
          >
            <Joke
              content={joke.content}
              author={joke.author}
              id={joke.id}
              rating={joke.rating}
              allowRate={false}
            />
          </div>
        ))}
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentJoke ? (
          <div>
            <h4>Review or change</h4>
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
                {currentJoke.published ? (
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
                )}
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={updateJoke}
                >
                  Save
                </button>
                <button
                  className="badge badge-danger mx-2"
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
            <br />
            <p>Please select...</p>
          </div>
        )}
      </div>
    </div>
  );
}
