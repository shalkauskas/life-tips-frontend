import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAllPublished()
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const findBySearch = () => {
    TutorialDataService.findBySearch(search)
      .then((response) => {
        setTutorials(response.data);
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
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials.map((tutorial, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveTutorial(tutorial, index)}
              key={index}
            >
              {tutorial.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Author:</strong>
              </label>{" "}
              {currentTutorial.author}
            </div>
          </div>
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

export default TutorialsList;
