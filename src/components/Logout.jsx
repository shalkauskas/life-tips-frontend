import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
const clientId = process.env.REACT_APP_clientId;

export default function Logout() {
  const history = useHistory();
  const onLogoutSuccess = (res) => {
    localStorage.removeItem("loggedin");
    history.push("/tutorials");
    history.go(0);

    console.log("Logged out Success");
    alert("Logged out Successfully");
  };
  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
    ></GoogleLogout>
  );
}
