import React from "react";
import { Link, useLocation } from "react-router-dom";
import DataService from "../services/DataService";
export default function Joke(props) {
  const [joke, setJoke] = React.useState([]);
  Joke.defaultProps = {
    allowRate: true,
  };
  const jokeRatingCheck = localStorage.getItem(joke.id);
  const location = useLocation();
  const activeVoteStyle =
    "invert(55%) sepia(26%) saturate(6132%) hue-rotate(332deg) brightness(102%) contrast(101%)";
  React.useEffect(() => {
    const retrieveJokes = (id) => {
      DataService.get(id)
        .then((response) => {
          setJoke(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveJokes(props.id || location.pathname.slice(6));
  }, [location, props.id, jokeRatingCheck]);

  const updateRating = (modifier) => {
    console.log(jokeRatingCheck);
    if (modifier === jokeRatingCheck) {
      console.log("Already voted");
    } else {
      localStorage.setItem(joke.id, modifier);
      const data = {
        rating: modifier === "up" ? joke.rating + 1 : joke.rating - 1,
      };
      DataService.update(props.id || joke.id, data)
        .then((response) => {
          setJoke(response.data);

          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    console.log(modifier, jokeRatingCheck);
  };
  const ratingHandler = (score) => {
    // props.isAuthenticated ?
    updateRating(score);
    // : alert("You must be logged in to rate posts!");
  };
  const jokeId = (props.id || window.location.pathname.slice(6)).replace(
    /\D/g,
    ""
  );

  return (
    <article className="card shadow-sm mx-auto">
      <div className="card-header">
        <Link
          to={{
            pathname: `/joke/${props.id || joke.id}`,
          }}
        >
          <span className="text-success">
            <u>#{jokeId.slice(jokeId.length - 5)}</u>
          </span>
        </Link>
        <img
          alt="share"
          src="/share.svg"
          width="16px"
          height="16px"
          title="Copy link to clipboard"
          aria-label="Copy link"
          className="text-muted ml-3 align-text-top"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href + `joke/${props.id || joke.id}`
            );
          }}
        />
        <span className="float-right text-muted">{joke.time}</span>
      </div>
      <div className="card-body">
        <p>{joke.content}</p>
      </div>
      <div className="card-footer justify-content-between d-flex ">
        <span className="text-muted">
          <i>{joke.author}</i>
        </span>
        <div className="d-flex align-middle align-items-md-center">
          <img
            alt="Vote up"
            src="/up-arrow.svg"
            width="18px"
            height="18px"
            onClick={() => ratingHandler("up")}
            className={`${props.allowRate ? "" : "d-none"}`}
            style={{ filter: jokeRatingCheck === "up" ? activeVoteStyle : "" }}
          />

          <p className="mx-2 mb-0 align-self-center">
            <b>{joke.rating}</b>
          </p>
          <img
            alt="Vote down"
            src="/down-arrow.svg"
            width="18px"
            height="18px"
            onClick={() => ratingHandler("down")}
            className={`${props.allowRate ? "" : "d-none"}`}
            style={{
              filter: jokeRatingCheck === "down" ? activeVoteStyle : "",
            }}
          />
        </div>
      </div>
    </article>
  );
}
