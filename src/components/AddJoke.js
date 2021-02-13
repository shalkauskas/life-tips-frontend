import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddJoke = (props) => {
  const initialJokeState = {
    id: null,
    content: "",
    published: false,
    author: "Anonymous",
    userId: "0",
    rating: "0",
  };
  const [joke, setJoke] = useState(initialJokeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJoke({ ...joke, [name]: value });
  };
  const saveJoke = () => {
    var data = {
      content: joke.content,
      author: props.author,
      userId: props.userId,
    };
    TutorialDataService.create(data)
      .then((response) => {
        setJoke({
          id: response.data.id,
          rating: response.data.rating,
          content: response.data.content,
          published: response.data.published,
          author: response.data.author,
          userId: response.data.userId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newJoke = () => {
    setJoke(initialJokeState);
    setSubmitted(false);
  };

  return (
    <div>
      <h2 className={`${submitted ? "d-none" : ""} mb-5 text-center`}>
        Put your pun here!
      </h2>
      <div className="submit-form">
        {submitted ? (
          <div className="text-center">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newJoke}>
              Add another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                id="description"
                required
                value={joke.content}
                onChange={handleInputChange}
                name="content"
                style={{ height: "10rem" }}
              />
            </div>

            <button onClick={saveJoke} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJoke;
