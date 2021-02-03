import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Logout from "./components/Logout";
import { isLogin } from "./utils/refreshToken";
import Index from "./components/Index";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import React from "react";
import AuthService from "./services/AuthService";
export default function App() {
  const [userdata, setUserdata] = React.useState([]);
  React.useEffect(() => {
    if (isLogin()) {
      AuthService.index()
        .then((response) => {
          setUserdata(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  // console.log(userdata.photoUrl);
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Web Development Tutorials
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/tutorials/update/"} className="nav-link">
              Edit
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          <img
            src={userdata.photoUrl}
            alt="user profile pic"
            width="35px"
            height="35px"
            className="rounded-circle mr-3 my-auto"
          />
          <li className="nav-item">
            {isLogin() ? (
              <Link to={"/signout"} className="nav-link">
                Logout
              </Link>
            ) : (
              <Link to={"/signin"} className="nav-link">
                Log in
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={"/"} component={Index} />
          <Route exact path={"/tutorials"} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/update/:id" component={Tutorial} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signout" component={Logout} />
          <PrivateRoute
            path="/tutorials/update/"
            component={TutorialsList}
            exact
          />
        </Switch>
      </div>
    </div>
  );
}
