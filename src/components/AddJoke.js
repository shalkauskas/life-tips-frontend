import React, { useState } from "react";
import DataService from "../services/DataService";

const AddJoke = (props) => {
  const time = new Date().toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const initialJokeState = {
    id: null,
    content: "",
    published: false,
    author: "Anonymous",
    userId: "0",
    rating: "0",
    time: time,
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
      time: time,
    };
    DataService.create(data)
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
    <div className="mt-4 ">
      <div className="submit-form px-3">
        {submitted ? (
          <div className="text-center">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newJoke}>
              Add another
            </button>
          </div>
        ) : (
          <div className="text-center">
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
