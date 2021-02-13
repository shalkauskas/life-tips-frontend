import React from "react";
import TutorialDataService from "../services/TutorialService";
export default function Joke(props) {
  const [rating, setRating] = React.useState(props.rating);
  const mounted = React.useRef();

  // React.useEffect(() => {
  //   // if (!mounted.current) {
  // const retrieveJokes = (id) => {
  //   TutorialDataService.get(id)
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
      TutorialDataService.get(id)
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
    const data = {
      rating: modifier ? rating + 1 : rating - 1,
    };
    setRating(rating + 1);
    console.log(data);
    TutorialDataService.update(props.id, data)
      .then((response) => {
        // setRating(response.data.rating);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // const ratingUp = () => {
  //   rating.hasVoted
  //     ? setRating({ count: rating.count - 1, hasVoted: false })
  //     : setRating({ count: rating.count + 1, hasVoted: true });
  // };
  // const ratingDown = () => {
  //   rating.hasVoted
  //     ? setRating({ count: rating.count + 1, hasVoted: false })
  //     : setRating({ count: rating.count - 1, hasVoted: true });
  // };
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <p>{props.content}</p>
      </div>
      <div className="card-footer">
        <span>{props.author}</span>
        <div className="float-right d-flex align-middle">
          <span
            onClick={() => updateRating(true)}
            style={{ transform: "rotate(180deg)" }}
            // className={`${
            //   rating.hasVoted && rating.count + 1 ? "text-success" : ""
            // }`}
          >
            &#8681;
          </span>
          <p className="mx-2 mb-0 align-self-center">{rating}</p>
          <span
            onClick={() => updateRating(false)}
            // className={`${
            //   rating.hasVoted && rating.count - 1 ? "text-danger" : ""
            // }`}
          >
            &#8681;
          </span>
        </div>
      </div>
    </div>
  );
}
