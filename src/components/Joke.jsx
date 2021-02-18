import React from "react";
import { Link } from "react-router-dom";
import DataService from "../services/DataService";
export default function Joke(props) {
  const [rating, setRating] = React.useState(props.rating);
  Joke.defaultProps = {
    allowRate: true,
  };
  React.useEffect(() => {
    const retrieveJokes = (id) => {
      DataService.get(id)
        .then((response) => {
          // console.log(response.data);
          setRating(response.data.rating);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveJokes(props.id || props.location.state.id);
  }, [props.id]);
  const updateRating = (modifier) => {
    console.log(modifier);
    const data = {
      rating: modifier === "up" ? rating + 1 : rating - 1,
    };
    setRating(data.rating);
    console.log(data);
    DataService.update(props.id || props.location.state.id, data)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };
  const ratingHandler = (score) => {
    props.isAuthenticated || props.location.state.isAuthenticated
      ? updateRating(score)
      : alert("You must be logged in to rate posts!");
  };
  const jokeId = (props.id || props.location.state.id).replace(/\D/g, "");
  return (
    <article className="card shadow-sm mx-auto" style={{ maxWidth: "50vw" }}>
      <div className="card-header">
        {window.location.pathname ===
        `/joke/${props.id || props.location.state.id}` ? (
          <Link to="/">
            <span className="text-success">
              <u>#{jokeId.slice(jokeId.length - 5)}</u>
            </span>
          </Link>
        ) : (
          <Link
            to={{
              pathname: `/joke/${props.id || props.location.state.id}`,
              state: {
                id: props.id,
                content: props.content,
                author: props.author,
                time: props.time,
                rating: rating,
                isAuthenticated: props.isAuthenticated,
              },
            }}
          >
            <span className="text-success">
              <u>#{jokeId.slice(jokeId.length - 5)}</u>
            </span>
          </Link>
        )}

        <span className="float-right text-muted">
          {props.time || props.location.state.time}
        </span>
      </div>
      <div className="card-body">
        <p>{props.content || props.location.state.content}</p>
      </div>
      <div className="card-footer">
        <span className="text-muted">
          <i>{props.author || props.location.state.author}</i>
        </span>
        <div className="float-right d-flex align-middle">
          <span
            onClick={() => ratingHandler("up")}
            style={{ transform: "rotate(180deg)" }}
            className={`${props.allowRate ? "" : "d-none"}`}
          >
            &#8681;
          </span>
          <p className="mx-2 mb-0 align-self-center">
            <b>{rating}</b>
          </p>
          <span
            onClick={() => ratingHandler("down")}
            className={`${props.allowRate ? "" : "d-none"}`}
          >
            &#8681;
          </span>
        </div>
      </div>
    </article>
  );
}
