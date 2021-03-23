import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import JokeEditList from "../components/JokesEdit/JokeEditList";
export default function JokesEdit() {
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
  return (
    <div className="d-flex flex-row flex-wrap-reverse justify-content-center bg-light p-3">
      <JokeEditList
        adminRole={adminRole}
        update={message.length > 1 ? true : false}
        setMessage={setMessage}
      />
    </div>
  );
}
