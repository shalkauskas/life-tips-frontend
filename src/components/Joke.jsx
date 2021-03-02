import Tooltip from "./Tooltip";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DataService from "../services/DataService";
export default function Joke(props) {
  const [joke, setJoke] = React.useState([]);
  const jokeRatingCheck = localStorage.getItem(joke.id);
  const location = useLocation();
  const activeVoteStyle =
    "invert(55%) sepia(26%) saturate(6132%) hue-rotate(332deg) brightness(102%) contrast(101%)";
  React.useEffect(() => {
    let mounted = true;
    const retrieveJokes = (id) => {
      DataService.get(id)
        .then((response) => {
          if (mounted) setJoke(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveJokes(props.id || location.pathname.slice(6));
    return () => (mounted = false);
  }, [location, props.id, jokeRatingCheck]);

  const updateRating = (modifier) => {
    const updateRatingAPI = (data) => {
      DataService.update(props.id || joke.id, data)
        .then((response) => {
          setJoke(response.data);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    if (modifier === jokeRatingCheck) {
      if (modifier === "up") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating - 1,
        };
        updateRatingAPI(data);
      } else if (modifier === "down") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating + 1,
        };
        updateRatingAPI(data);
      } else {
        // console.log("Already voted");
      }
    } else {
      if (jokeRatingCheck === "up") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating - 1,
        };
        updateRatingAPI(data);
      } else if (jokeRatingCheck === "down") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating + 1,
        };
        updateRatingAPI(data);
      } else {
        localStorage.setItem(joke.id, modifier);
        const data = {
          rating:
            modifier === "up"
              ? joke.rating + 1
              : "down"
              ? joke.rating - 1
              : joke.rating,
        };
        updateRatingAPI(data);
      }
    }
    // console.log(modifier, jokeRatingCheck);
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
  const shareButton = () => {
    navigator.clipboard.writeText(
      window.location.href + `joke/${props.id || joke.id}`
    );
  };
  return (
    <article className="card shadow-sm mx-auto list">
      <div className="card-header" onClick={() => console.log(jokeRatingCheck)}>
        <Link
          to={{
            pathname: `/joke/${props.id || joke.id}`,
          }}
        >
          <span className="text-success">
            <u>#{jokeId.slice(jokeId.length - 5)}</u>
          </span>
        </Link>
        <Tooltip content="Copy link to clipboard" direction="right" delay="0">
          <img
            alt="share"
            src="/share.svg"
            width="16px"
            height="16px"
            aria-label="Copy link"
            className="text-muted ml-2 align-text-top"
            style={{ cursor: "pointer" }}
            onClick={shareButton}
          />
        </Tooltip>

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
            className={``}
            style={{
              filter: jokeRatingCheck === "up" ? activeVoteStyle : "",
              display: props.allowRate ? "none" : "block",
            }}
          />

          <p className="mx-2 mb-0 align-self-center">
            <b>[{joke.rating}]</b>
          </p>
          <img
            alt="Vote down"
            src="/down-arrow.svg"
            width="18px"
            height="18px"
            onClick={() => ratingHandler("down")}
            className={``}
            style={{
              filter: jokeRatingCheck === "down" ? activeVoteStyle : "",
              display: props.allowRate ? "none" : "block",
            }}
          />
        </div>
      </div>
    </article>
  );
}
