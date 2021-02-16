import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import AddJoke from "./components/AddJoke";
import JokesList from "./components/JokesList";
import Joke from "./components/Joke";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import AuthService from "./services/AuthService";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
import Search from "./components/Search";
import DataService from "./services/DataService";
export default function App() {
  const [userdata, setUserdata] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [jokes, setJokes] = React.useState([]);
  React.useEffect(() => {
    const findBySearch = () => {
      DataService.findBySearch(search)
        .then((response) => {
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
  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };

  // search
  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const reset = () => {
    setSearch("");
  };
  const findBySearch = () => {
    DataService.findBySearch(search)
      .then((response) => {
        setJokes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
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
            <Link to={"/explore"} className="nav-link">
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="ml-2 nav-item my-auto">
            <Search
              onChangeSearch={onChangeSearch}
              findBySearch={findBySearch}
              search={search}
              reset={reset}
            />
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          <Link
            to={`/dashboard`}
            className={`${isAuthenticated ? "my-auto d-inline " : "d-none"}`}
          >
            <span className="mr-3 text-light align-middle">
              {userdata.displayName}
            </span>
            <img
              src={"favicon.ico"}
              alt="user profile pic"
              width="35px"
              height="35px"
              className={` rounded-circle mr-3 my-auto`}
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
          <Route
            exact
            path={"/"}
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
            path={"/explore"}
            render={(props) => (
              <JokesList
                {...props}
                jokes={jokes}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path={"/joke/:id"}
            render={(props) => <Joke {...props} />}
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
