import React, { useState, useEffect } from "react";
import Joke from "./Joke";
const JokesList = (props) => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    setJokes(props.jokes);
  }, [props.jokes]);

  return (
    <>
      {jokes.map((joke, index) => (
        <div key={index}>
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
    </>
  );
};

export default JokesList;
