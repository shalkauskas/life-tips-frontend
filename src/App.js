import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddJoke from "./components/AddJoke";
import Joke from "./components/Joke";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import AuthService from "./services/AuthService";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import JokesEdit from "./pages/JokesEdit";
import ScrollButton from "./components/ScrollButton";
import SearchResult from "./pages/SearchResult";
import Header from "./components/Header";
export default function App(props) {
  const [userdata, setUserdata] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    async function authorize() {
      await AuthService.index()
        .then((response) => {
          console.log(response);
          setAuthenticated(response.data.isAuthenticated);
          setUserdata(response.data.user);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    authorize();
  }, []);

  return (
    <div className="bg-light pb-5 h-100 min-vh-100 position-relative">
      <Header userdata={userdata} isAuthenticated={isAuthenticated} />

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
