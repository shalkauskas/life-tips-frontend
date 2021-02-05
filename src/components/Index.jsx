import React from "react";
import TutorialDataService from "../services/TutorialService";
export default function Index() {
  const [tutorials, setTutorials] = React.useState([]);
  React.useEffect(() => {
    retrieveTutorials();
  }, []);
  const retrieveTutorials = () => {
    TutorialDataService.getAllPublished()
      .then((response) => {
        setTutorials(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <h1 className="text-center">Welcome to Web Development Tutorials</h1>
      <div className="container">
        {tutorials.map((tutorial, index) => (
          <div key={index}>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {tutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {tutorial.description}
            </div>
            <div>
              <label>
                <strong>Author:</strong>
              </label>{" "}
              {tutorial.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
