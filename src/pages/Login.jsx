import AuthService from "../services/AuthService";
import React from "react";
import { Link } from "react-router-dom";
export default function Login(props) {
  const initialUserData = {
    username: "",
    password: "",
  };
  const [userdata, setUserData] = React.useState(initialUserData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userdata, [name]: value });
  };
  const loginUser = () => {
    var data = {
      username: userdata.username,
      password: userdata.password,
    };
    AuthService.login(data)
      .then((response) => {
        response.data.isAuthenticated
          ? onLogin()
          : props.history.push("/login");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const loginGoogle = () => {
    AuthService.loginGoogle().then((response) => {
      console.log(response);
    });
  };
  const onLogin = () => {
    props.history.push("/");
    props.history.go(0);
  };
  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">Login</h1>

      <div className="col">
        <div className="col">
          <div className="card">
            <div className="card-body">
              {/* <!-- Makes POST request to /login route --> */}
              <div className="submit-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    value={userdata.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={userdata.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark float-right"
                  onClick={loginUser}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <a
            href={`${process.env.REACT_APP_SERVER}/auth/google`}
            onClick={loginGoogle}
          >
            <img src="google-login.svg" alt="google login" width="300px" />
          </a>
        </div>
        <hr />
        <div className="card mx-auto">
          <div className="card-body text-center ">
            {" "}
            <p className="lead">Don't have an account yet?</p>
            <Link to="/register">
              <p className="underline">
                <u>Register in one click</u>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
