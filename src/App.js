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
import Header from "./components/Header/Header";
import About from "./pages/About";
export default function App(props) {
  const [userdata, setUserdata] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    async function authorize() {
      await AuthService.index()
        .then((response) => {
          console.log(response);
          localStorage.setItem(
            `isAuthenticated`,
            response.data.isAuthenticated
          );
          setAuthenticated(response.data.isAuthenticated);
          setUserdata(response.data.user);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    authorize();
  }, []);
  const session = localStorage.getItem(`isAuthenticated`);

  return (
    <div className="bg-light h-100 min-vh-100 position-relative">
      <Header userdata={userdata} isAuthenticated={isAuthenticated} />

      <div className="pb-5" style={{ paddingTop: "6rem" }}>
        <Switch>
          <Route path={"/about"} component={About} />
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
            path="/login"
            exact
            component={Login}
            isAuthenticated={isAuthenticated}
          />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            path={`/dashboard`}
            component={JokesEdit}
            isAuthenticated={session}
            userdata={userdata}
            exact
          />
          <PrivateRoute
            path={`/dashboard/profile`}
            component={UserProfile}
            isAuthenticated={session}
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
