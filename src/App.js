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
import DataService from "./services/DataService";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
export default function App() {
  const [userdata, setUserdata] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [jokes, setJokes] = React.useState([]);
  React.useEffect(() => {
    const findBySearch = () => {
      DataService.findBySearch(search)
        .then((response) => {
          if (window.location.pathname === "/best") {
            response.data.sort((a, b) => (a.rating < b.rating ? 1 : -1));
          } else if (window.location.pathname === "/") {
            response.data.sort((a, b) => (a.time < b.time ? 1 : -1));
          } else if (window.location.pathname === "/random") {
            response.data.sort(() => 0.5 - Math.random());
          } else return response.data;
          setJokes(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    AuthService.index()
      .then((response) => {
        console.log(response);
        setAuthenticated(response.data.isAuthenticated);
        findBySearch();
        isAuthenticated ? setUserdata(response.data.user) : setUserdata([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isAuthenticated, search]);

  // search
  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const reset = () => {
    setSearch("");
    setShowSearch(false);
  };
  const findBySearch = () => {
    DataService.findBySearch(search)
      .then((response) => {
        if (window.location.pathname === "/best") {
          response.data.sort((a, b) => (a.rating < b.rating ? 1 : -1));
        } else if (window.location.pathname === "/") {
          response.data.sort((a, b) => (a.time < b.time ? 1 : -1));
        } else if (window.location.pathname === "/random") {
          response.data.sort(() => 0.5 - Math.random());
        } else return response.data;
        setJokes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="bg-light pb-5 h-100 min-vh-100">
      <nav className="navbar navbar-expand navbar-light bg-white border-bottom pr-sm-1">
        <Link
          to="/"
          className={`navbar-brand mr-sm-1 ${showSearch ? "mr-0" : "mr-3"}`}
          onClick={findBySearch}
        >
          <img
            alt="Logo"
            src="/joke.svg"
            width="26px"
            height="26px"
            className="mr-2 align-top"
          />
          <b>DB jokes</b>
        </Link>
        <div className="navbar-nav mr-auto ml-sm-5">
          <li className={`${showSearch ? "d-none d-sm-block" : ""} nav-item`}>
            <Link to={"/add"} className="nav-link">
              <img
                alt="Add"
                src="/plus.svg"
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
              Add{" "}
            </Link>
          </li>
          <li className="ml-2 nav-item my-auto">
            {showSearch ? (
              <Search
                onChangeSearch={onChangeSearch}
                findBySearch={findBySearch}
                search={search}
                reset={reset}
              />
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
        </div>
        <div className="navbar-nav ml-sm-auto mx-1">
          {isAuthenticated ? (
            <li className="nav-item">
              <Link to={`/dashboard`} className={`my-auto d-inline`}>
                <span
                  className={`mr-sm-3 nav-link align-middle ${
                    showSearch ? "d-none d-sm-inline-block" : "d-inline-block"
                  }`}
                >
                  {userdata.displayName}
                </span>
                <img
                  src={"/user.svg"}
                  alt="user profile pic"
                  width="35px"
                  height="35px"
                  className={` rounded-circle mr-sm-3 my-auto`}
                />
              </Link>
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

      <div className="mt-3 pb-5">
        <Switch>
          <Route
            exact
            path={["/", "/best", "/random"]}
            render={(props) => (
              <Index
                {...props}
                isAuthenticated={isAuthenticated}
                jokes={jokes}
              />
            )}
          />
          <Route
            exact
            path={"/joke/:id"}
            render={(props) => (
              <Joke {...props} isAuthenticated={isAuthenticated} />
            )}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddJoke
                {...props}
                author={userdata.displayName}
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
            path={`/dashboard`}
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            userdata={userdata}
            jokes={jokes}
            exact
          />
          <PrivateRoute
            path={`/dashboard/profile`}
            component={UserProfile}
            isAuthenticated={isAuthenticated}
            userdata={userdata}
            jokes={jokes}
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
