import React, { useState, useEffect } from "react";
import Joke from "./Joke";
const JokesList = (props) => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    setJokes(props.jokes);
  }, [props.jokes]);

  return (
    <div className="list mt-3">
      <h4 className="text-center">
        {/* {best ? "Best jokes" : random ? "Random" : "Fresh"} */}
      </h4>

      <div className="container">
        {jokes.map((joke, index) => (
          <div key={index} className="my-4">
            <Joke
              content={joke.content}
              author={joke.author}
              id={joke.id}
              joke={jokes}
              rating={joke.rating}
              time={joke.time}
              isAuthenticated={props.isAuthenticated}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokesList;
