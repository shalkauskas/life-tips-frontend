import React, { useState, useEffect } from "react";
import DataService from "../services/DataService";
import Joke from "./Joke";
const JokesList = (props) => {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    retrieveJokes();
  }, []);

  const retrieveJokes = () => {
    DataService.getAllPublished()
      .then((response) => {
        setJokes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="list">
      <div className="col-md-6">
        <h4>Best puns</h4>

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
    </div>
  );
};

export default JokesList;
