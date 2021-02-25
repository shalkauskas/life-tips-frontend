import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import AddJoke from "./components/AddJoke";
import Joke from "./components/Joke";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import AuthService from "./services/AuthService";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
import Search from "./components/Search";

import Footer from "./components/Footer";
import JokesEdit from "./components/JokesEdit";
import ScrollButton from "./components/ScrollButton";
import SearchResult from "./components/SearchResult";
export default function App(props) {
  const [userdata, setUserdata] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);

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
  // logout
  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };
  return (
    <div className="bg-light pb-5 h-100 min-vh-100 position-relative">
      <nav
        className="navbar navbar-expand navbar-light bg-white border-bottom pr-sm-1 fixed-top"
        onMouseLeave={() => setDropdown(false)}
      >
        <Link
          to="/"
          className={`navbar-brand mr-sm-1 ${showSearch ? "mr-0" : "mr-3"}`}
        >
          <img
            alt="Logo"
            src="/joke.svg"
            width="26px"
            height="26px"
            className="mr-2 align-top"
          />
          DB jokes
        </Link>
        <div className="navbar-nav ml-auto mx-1">
          <li className="ml-auto nav-item my-auto" style={{ maxWidth: "75%" }}>
            {showSearch ? (
              <Search setShowSearch={setShowSearch} />
            ) : (
              <span className="nav-link" onClick={() => setShowSearch(true)}>
                <img
                  alt="Search"
                  src="/search.svg"
                  width="14px"
                  height="14px"
                  style={{
                    filter:
                      "invert(71%) sepia(7%) saturate(155%) hue-rotate(155deg) brightness(88%) contrast(84%)",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                Search
              </span>
            )}
          </li>

          <li className="nav-item">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className={`my-auto d-inline btn dropdown-toggle`}
                  onClick={() => setDropdown(!dropdown)}
                >
                  <img
                    src={userdata.photoUrl || "/user.svg"}
                    alt="user profile pic"
                    width="35px"
                    height="35px"
                    className={` rounded-circle my-auto`}
                  />
                  <span
                    className={`nav-link align-middle ${
                      showSearch ? "d-none d-sm-inline-block" : "d-inline-block"
                    }`}
                  >
                    {userdata.displayName}
                  </span>
                </button>
                <div
                  className={`${dropdown ? "d-block" : ""} dropdown-menu`}
                  style={{ minWidth: "0" }}
                >
                  <Link to="/dashboard" className="dropdown-item">
                    My jokes
                  </Link>
                  <Link to="/dashboard/profile" className="dropdown-item">
                    Edit profile
                  </Link>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Link to={"/login"} className="nav-link">
                  <img
                    src="/enter.svg"
                    alt="login"
                    width="15px"
                    height="15px"
                    className="d-block mx-auto"
                    style={{
                      filter:
                        "invert(71%) sepia(7%) saturate(155%) hue-rotate(155deg) brightness(88%) contrast(84%)",
                    }}
                  />
                  Log in
                </Link>
              </div>
            )}
          </li>
        </div>
      </nav>

      <div className="mt-5 pt-5">
        <Switch>
          <Route
            path={["/", "/best", "/random"]}
            exact
            render={(props) => (
              <Index {...props} isAuthenticated={isAuthenticated} />
            )}
          />
          <Route
            path={"/joke/:id"}
            exact
            render={(props) => (
              <Joke {...props} isAuthenticated={isAuthenticated} />
            )}
          />
          <Route
            path={"/search"}
            exact
            render={(props) => (
              <SearchResult {...props} isAuthenticated={isAuthenticated} />
            )}
          />
          <Route
            path="/add"
            exact
            render={(props) => (
              <AddJoke
                {...props}
                author={userdata.displayName}
                userId={userdata.id}
              />
            )}
          />
          <Route
            path="/login"
            exact
            component={Login}
            isAuthenticated={isAuthenticated}
          />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            path={`/dashboard`}
            component={JokesEdit}
            isAuthenticated={isAuthenticated}
            userdata={userdata}
            exact
          />
          <PrivateRoute
            path={`/dashboard/profile`}
            component={UserProfile}
            isAuthenticated={isAuthenticated}
            userdata={userdata}
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </div>
      <ScrollButton />

      <Footer />
    </div>
  );
}
