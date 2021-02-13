import AuthService from "../services/AuthService";
import React from "react";

export default function Register(props) {
  const initialUserData = {
    displayName: "",
    username: "",
    password: "",
  };
  const [userdata, setUserData] = React.useState(initialUserData);
  const [submitted, setSubmitted] = React.useState(false);
  const saveUser = () => {
    var data = {
      displayName: userdata.displayName,
      username: userdata.username,
      password: userdata.password,
    };
    AuthService.register(data)
      .then((response) => {
        //    setUserData({
        //      username: response.data.username,
        //      password: response.data.password,
        //    });
        setSubmitted(true);
        submitted && response.data.success
          ? props.history.push("/")
          : props.history.push("/register");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
    <div className="container mt-5">
      <h1 className="text-center">Register</h1>

      <div className="col">
        <div className="col">
          <div className="card">
            <div className="card-body">
              {/* <!-- Makes POST request to /register route --> */}
              <div className="submit-form">
                <div className="form-group">
                  <label htmlFor="displayName">Name</label>
                  <input
                    type="text"
                    id="displayName"
                    className="form-control"
                    name="name"
                    value={userdata.displayName}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    value={userdata.username}
                    onChange={handleInputChange}
                    required
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
                    required
                  />
                </div>
                <button className="btn btn-dark float-right" onClick={saveUser}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4 mx-auto mt-3">
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
