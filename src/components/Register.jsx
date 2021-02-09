import AuthService from "../services/AuthService";
import React from "react";

export default function Register(props) {
  const initialUserData = {
    username: "",
    password: "",
  };
  const [userdata, setUserData] = React.useState(initialUserData);
  const [submitted, setSubmitted] = React.useState(false);
  const saveUser = () => {
    var data = {
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
  return (
    <div className="container mt-5">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              {/* <!-- Makes POST request to /register route --> */}
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
                <button className="btn btn-dark" onClick={saveUser}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <a
                className="btn btn-block btn-social btn-google"
                href="/auth/google"
                role="button"
              >
                <i className="fab fa-google"></i>
                Sign Up with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
