import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import AddJoke from "./components/AddJoke";
import Tutorial from "./components/Tutorial";
import JokesList from "./components/JokesList";
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
        console.log(response);

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
          DB jokes
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
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
          <Route exact path={"/tutorials"} component={JokesList} />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddJoke
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
