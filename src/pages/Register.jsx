import AuthService from "../services/AuthService";
import React from "react";

export default function Register(props) {
  const initialUserData = {
    displayName: "",
    username: "",
    password: "",
  };
  const [userdata, setUserData] = React.useState(initialUserData);
  const saveUser = () => {
    var data = {
      displayName: userdata.displayName,
      username: userdata.username,
      password: userdata.password,
    };
    AuthService.register(data)
      .then((response) => {
        response.data.success ? onRegister() : props.history.push("/register");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onRegister = () => {
    props.history.push("/");
    props.history.go(0);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userdata, [name]: value });
  };

  const loginGoogle = () => {
    AuthService.loginGoogle().then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">Register</h1>

      <div className="col">
        <div className="">
          <div className="card">
            <div className="card-body">
              {/* <!-- Makes POST request to /register route --> */}
              <div className="submit-form">
                <div className="form-group">
                  <label htmlFor="displayName">Name*</label>
                  <input
                    type="text"
                    id="displayName"
                    className={`form-control ${
                      userdata.displayName.length > 1 ? "is-valid" : ""
                    }`}
                    name="displayName"
                    value={userdata.displayName}
                    onChange={handleInputChange}
                    autoComplete="name"
                    max="20"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    className={`form-control ${
                      userdata.username.includes("@" && ".") ? "is-valid" : ""
                    }`}
                    name="username"
                    value={userdata.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password*</label>

                  <input
                    type="password"
                    className={`form-control ${
                      userdata.password.length >= 6 ? "is-valid" : ""
                    }`}
                    name="password"
                    min="6"
                    value={userdata.password}
                    onChange={handleInputChange}
                    required
                  />
                  <small id="passwordHelpBlock" class="form-text text-muted">
                    Your password must be at least 6 characters long.
                  </small>
                </div>
                <button className="btn btn-dark float-right" onClick={saveUser}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <div className="text-center">
            <a
              href={`${process.env.REACT_APP_SERVER}/auth/google`}
              onClick={loginGoogle}
            >
              <img src="google-login.svg" alt="google login" width="300px" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
