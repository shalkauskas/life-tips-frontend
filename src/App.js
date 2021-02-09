import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import TutorialsEdit from "./components/TutorialsEdit";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import React from "react";
import AuthService from "./services/AuthService";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
export default function App() {
  const [userdata, setUserdata] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  React.useEffect(() => {
    AuthService.index()
      .then((response) => {
        setAuthenticated(response.data.isAuthenticated);

        isAuthenticated ? setUserdata(response.data.user) : setUserdata([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isAuthenticated]);
  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Web Development Tutorials
        </Link>
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
            <Link to={`/tutorials/update/`} className="nav-link">
              Edit
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          <Link to={`/dashboard`} className="">
            <img
              src={"favicon.ico"}
              alt="user profile pic"
              width="35px"
              height="35px"
              className={`${
                isAuthenticated ? "" : "d-none"
              } rounded-circle mr-3 my-auto`}
            />
          </Link>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <span onClick={logout} className="nav-link">
                Logout
              </span>
            </li>
          ) : (
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log in
              </Link>
            </li>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={"/"} component={Index} />
          <Route exact path={"/tutorials"} component={TutorialsList} />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddTutorial
                {...props}
                author={userdata.username}
                userId={userdata.id}
              />
            )}
          />
          <Route
            exact
            path="/login"
            component={Login}
            isAuthenticated={isAuthenticated}
          />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            path={`/tutorials/update/:id`}
            component={Tutorial}
            isAuthenticated={isAuthenticated}
            // author={userdata.username}
            // userId={userdata.id}
            exact
          />
          <PrivateRoute
            path={`/tutorials/update/`}
            component={TutorialsEdit}
            isAuthenticated={isAuthenticated}
            // author={userdata.username}
            // userId={userdata.id}
          />
          <PrivateRoute
            path={`/dashboard`}
            component={UserProfile}
            isAuthenticated={isAuthenticated}
            userdata={userdata}
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}
