import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "***REMOVED***";

export default function Login() {
  const history = useHistory();
  const onSuccess = (res) => {
    const token = res.getAuthResponse().id_token;
    let login = () => localStorage.setItem("loggedin", token);
    console.log("Login Success: currentUser:", res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    login();
    history.push("/tutorials");
    history.go(0);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}
