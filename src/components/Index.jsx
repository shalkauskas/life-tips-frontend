import React from "react";
import { NavLink } from "react-router-dom";
import JokesList from "./JokesList";
export default function Index(props) {
  const [jokes, setJokes] = React.useState([]);
  React.useEffect(() => {
    setJokes(props.jokes);
  }, [props.jokes]);
  const orderNewest = [...jokes].sort((a, b) => (a.time < b.time ? 1 : -1));
  const orderBest = [...jokes].sort((a, b) => (a.rating < b.rating ? 1 : -1));
  const orderRandom = [...jokes].sort(() => 0.5 - Math.random());
  return (
    <div>
      <div className="text-center">
        <div className="btn-group " role="group" aria-label="Order">
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
        </div>
      </div>

      <JokesList jokes={jokes} />
    </div>
  );
}
