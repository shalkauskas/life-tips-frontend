import React from "react";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
const clientId =
  "***REMOVED***";

export default function Logout() {
  const history = useHistory();
  const onLogoutSuccess = (res) => {
    localStorage.removeItem("loggedin");
    history.push("/tutorials");
    history.go(0);

    console.log("Logged out Success");
    alert("Logged out Successfully");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src="google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}
