import AuthService from "../services/AuthService";
import React from "react";
export default function Login(props) {
  const initialUserData = {
    username: "",
    password: "",
  };
  const [userdata, setUserData] = React.useState(initialUserData);
  const [submitted, setSubmitted] = React.useState(false);

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
        //    setUserData({
        //      username: response.data.username,
        //      password: response.data.password,
        //    });

        //    why false ?
        response.data.isAuthenticated
          ? onLogin()
          : props.history.push("/login");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setSubmitted(true);
    console.log(submitted);
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
    <div className="container mt-5">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
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
                  className="btn btn-dark"
                  onClick={loginUser}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <a
                href={`${process.env.REACT_APP_SERVER}/auth/google`}
                className="btn btn-block btn-social btn-google"
                onClick={loginGoogle}
              >
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
