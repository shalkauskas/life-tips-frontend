import React from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { refreshTokenSetup } from "../utils/refreshToken";
export default function Login() {
  const [onLogin, setOnLogin] = React.useState({
    display: false,
    response: null,
  });
  const clientId = process.env.REACT_APP_clientId;
  const history = useHistory();
  const onSuccess = (res) => {
    const token = res.getAuthResponse().id_token;
    // console.log("Login Success: currentUser:", res.profileObj);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    // save token to user's browser
    localStorage.setItem("loggedin", token);
    refreshTokenSetup(res);
    setOnLogin(() => ({ display: true, response: res.profileObj }));
    //  redirect to index and refresh to apply
    const redirect = () => {
      history.push("/");
      history.go(0);
    };
    setTimeout(redirect, 2000);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  return (
    <div className="text-center">
      {onLogin.display ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">
            Logged in successfully welcome {onLogin.response.name}
          </h4>
          <p>Redirectng to main page</p>
        </div>
      ) : (
        <div>
          <h2>Please login to make changes</h2>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
}
