import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import JokeEditReview from "../components/JokesEdit/JokeEditReview";
import JokeEditList from "../components/JokesEdit/JokeEditList";
export default function JokesEdit(props) {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [message, setMessage] = useState("");
  const [adminRole, setAdminRole] = useState(false);

  useEffect(() => {
    AuthService.admin().then((response) => {
      if (response.data.admin) {
        setAdminRole(true);
      } else {
        console.log(response);
      }
    });
  }, []);

  const refreshList = () => {
    setCurrentJoke(null);
  };

  return (
    <div className="d-flex flex-row flex-wrap-reverse justify-content-center bg-light p-3">
      <JokeEditList
        adminRole={adminRole}
        refreshList={refreshList}
        update={message.length > 1 ? true : false}
        setMessage={setMessage}
        setCurrentJoke={setCurrentJoke}
      />

      <JokeEditReview
        currentJoke={currentJoke}
        setCurrentJoke={setCurrentJoke}
        adminRole={adminRole}
        refreshList={refreshList}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
