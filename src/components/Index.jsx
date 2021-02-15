import React from "react";
import DataService from "../services/DataService";
import Joke from "./Joke";
export default function Index(props) {
  const [jokes, setJokes] = React.useState([]);

  React.useEffect(() => {
    retrieveJokes();
  }, []);
  const retrieveJokes = () => {
    DataService.getAllPublished()
      .then((response) => {
        setJokes(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <h1 className="text-center">Welcome to Dad's Bad jokes!</h1>
      <div className="container">
        {(props.jokes ? props.jokes : jokes).map((joke, index) => (
          <div key={index} className="my-4">
            <Joke
              content={joke.content}
              author={joke.author}
              id={joke.id}
              rating={joke.rating}
              isAuthenticated={props.isAuthenticated}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
