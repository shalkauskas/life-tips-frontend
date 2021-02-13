import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import Joke from "./Joke";
import { Link } from "react-router-dom";

export default function TutorialsEdit(props) {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [search, setSearch] = useState("");

  const retrieveTutorials = React.useCallback(() => {
    TutorialDataService.getAll()
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
  }, [retrieveTutorials]);

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentJoke(null);
    setCurrentIndex(-1);
  };

  const setActiveJoke = (joke, index) => {
    setCurrentJoke(joke);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findBySearch = () => {
    TutorialDataService.findBySearch(search)
      .then((response) => {
        setJokes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={search}
            onChange={onChangeSearch}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearch("")}
          >
            Reset
          </button>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findBySearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>My Jokes</h4>
        {jokes.map((joke, index) => (
          <div
            key={index}
            onClick={() => setActiveJoke(joke, index)}
            className={
              "" + (index === currentIndex ? "border border-warning" : "")
            }
          >
            <Joke content={joke.content} author={joke.author} />
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
            <h4>Joke</h4>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentJoke.content}
            </div>
            <div>
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
            <Link
              to={`/tutorials/update/` + currentJoke.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
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
