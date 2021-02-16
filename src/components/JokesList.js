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
  const orderBest = (a, b) => (a.rating < b.rating ? 1 : -1);
  const orderNewest = (a, b) => (a.time < b.time ? 1 : -1);
  return (
    <div className="row">
      <div className="col-lg-6">
        <h4 className="text-center">Best puns</h4>

        <div className="container">
          {(props.jokes ? props.jokes : jokes)
            .sort(orderBest)
            .map((joke, index) => (
              <div key={index} className="my-4">
                <Joke
                  content={joke.content}
                  author={joke.author}
                  id={joke.id}
                  rating={joke.rating}
                  time={joke.time}
                  isAuthenticated={props.isAuthenticated}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="col-lg-6">
        <h4 className="text-center">Newest</h4>

        <div className="container">
          {(props.jokes ? props.jokes : jokes)
            .sort(orderNewest)
            .map((joke, index) => (
              <div key={index} className="my-4">
                <Joke
                  content={joke.content}
                  author={joke.author}
                  id={joke.id}
                  rating={joke.rating}
                  time={joke.time}
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
