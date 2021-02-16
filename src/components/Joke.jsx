import React from "react";
import DataService from "../services/DataService";
export default function Joke(props) {
  const [rating, setRating] = React.useState(props.rating);
  Joke.defaultProps = { allowRate: true };
  // React.useEffect(() => {
  //   // if (!mounted.current) {
  // const retrieveJokes = (id) => {
  //   DataService.get(id)
  //     .then((response) => {
  //       setRating({ count: response.data.rating, ...rating });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  //   retrieveJokes(props.id);
  //   // mounted.current = true;
  //   // } else {

  //   // }
  // }, [props.id, rating]);

  React.useEffect(() => {
    const retrieveJokes = (id) => {
      DataService.get(id)
        .then((response) => {
          setRating(response.data.rating);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveJokes(props.id);
  }, [props.id]);

  const updateRating = (modifier) => {
    console.log(modifier);
    const data = {
      rating: modifier === "up" ? rating + 1 : rating - 1,
    };
    setRating(data.rating);
    console.log(data);
    DataService.update(props.id, data)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };
  const ratingHandler = (score) => {
    props.isAuthenticated
      ? updateRating(score)
      : alert("You must be logged in to rate posts!");
  };
  const jokeId = props.id.replace(/\D/g, "");
  return (
    <article className="card shadow-sm">
      <div className="card-header">
        <span>
          <u>#{jokeId.slice(jokeId.length - 5)}</u>
        </span>
        <span className="float-right"> {props.time}</span>
      </div>
      <div className="card-body">
        <p>{props.content}</p>
      </div>
      <div className="card-footer">
        <span>
          <i>{props.author}</i>
        </span>
        <div className="float-right d-flex align-middle">
          <span
            onClick={() => ratingHandler("up")}
            style={{ transform: "rotate(180deg)" }}
            className={`${props.allowRate ? "" : "d-none"}`}
          >
            &#8681;
          </span>
          <p className="mx-2 mb-0 align-self-center">{rating}</p>
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
