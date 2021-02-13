import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import Joke from "./Joke";
const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    retrieveJokes();
  }, []);

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const retrieveJokes = () => {
    TutorialDataService.getAllPublished()
      .then((response) => {
        setJokes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveJoke = (joke, index) => {
    setCurrentJoke(joke);
    setCurrentIndex(index);
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
        <h4>Best puns</h4>

        <ul className="list-group">
          {jokes.map((joke, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveJoke(joke, index)}
              key={index}
            >
              {joke.author}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentJoke ? (
          <Joke content={currentJoke.content} author={currentJoke.author} />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JokesList;
