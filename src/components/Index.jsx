import React from "react";
import { NavLink, Link } from "react-router-dom";
import AddJoke from "./AddJoke";
import JokesList from "./JokesList";
export default function Index(props) {
  const [jokes, setJokes] = React.useState([]);
  const [showAdd, setShowAdd] = React.useState(false);
  React.useEffect(() => {
    setJokes(props.jokes);
  }, [props.jokes, props.jokes.rating]);
  const orderNewest = [...jokes].sort((a, b) => (a.time < b.time ? 1 : -1));
  const orderBest = [...jokes].sort((a, b) => (a.rating < b.rating ? 1 : -1));
  const orderRandom = [...jokes].sort(() => 0.5 - Math.random());
  return (
    <div>
      <div className="d-flex justify-content-center list px-3">
        <div className="btn-group w-100" role="group" aria-label="Order">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className={`btn btn-outline-secondary`}
            onClick={() => setJokes(orderNewest)}
          >
            New
          </NavLink>
          <NavLink
            to="/best"
            activeClassName="active"
            className={`btn btn-outline-secondary`}
            onClick={() => setJokes(orderBest)}
          >
            Best
          </NavLink>
          <NavLink
            to="/random"
            activeClassName="active"
            className={`btn btn-outline-secondary`}
            onClick={() => setJokes(orderRandom)}
          >
            Random
          </NavLink>

          <button
            className={`ml-5 btn btn-success ${showAdd ? "disabled" : ""}`}
            onClick={() => setShowAdd(!showAdd)}
          >
            <img
              alt="Add"
              src="/plus.svg"
              width="14px"
              height="14px"
              style={{
                filter:
                  "invert(96%) sepia(97%) saturate(12%) hue-rotate(237deg) brightness(103%) contrast(103%)",
                display: "inline-block",
                marginRight: "5px",
              }}
            />
            Add{" "}
          </button>
        </div>
      </div>
      {showAdd ? <AddJoke /> : null}
      <JokesList jokes={jokes} isAuthenticated={props.isAuthenticated} />
    </div>
  );
}
