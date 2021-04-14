import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Post from "./components/Post";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import AuthService from "./services/AuthService";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import PostsEdit from "./pages/MyContent";
import ScrollButton from "./components/ScrollButton";
import SearchResult from "./pages/SearchResult";
import Header from "./components/Header/Header";
import About from "./pages/About";
import UserLiked from "./pages/UserLiked";
import { reduce, initialState } from "./services/GlobalContext";
export const GlobalContext = React.createContext();
export default function App() {
  const [state, dispatch] = React.useReducer(reduce, initialState);
  React.useEffect(() => {
    async function authorize() {
      await AuthService.index()
        .then((response) => {
          // console.log(response.data);
          response.data.isAuthenticated &&
            dispatch({
              type: "OnLogin",
              payload: {
                isAuthenticated: response.data.isAuthenticated,
                displayName: response.data.user.displayName,
                id: response.data.user.id,
                photoUrl: response.data.user.photoUrl,
                username: response.data.user.username,
              },
            });
          dispatch({
            type: "CheckAuth",
            payload: response.data.isAuthenticated,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    authorize();
  }, [state.User.isAuthenticated]);
  // console.log(state);
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      <div style={{ paddingBottom: "8rem" }}>
        <Header />

        <div style={{ paddingTop: "6rem" }}>
          <Switch>
            <Route path={"/about"} component={About} />
            <Route
              path={["/", "/best", "/random"]}
              exact
              render={(props) => <Index {...props} />}
            />
            <Route
              path={"/post/:id"}
              exact
              render={(props) => <Post {...props} />}
            />
            <Route
              path={"/search"}
              exact
              render={(props) => <SearchResult {...props} />}
            />
            <Route path="/login" exact component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute
              path={`/dashboard/profile`}
              component={UserProfile}
              exact
            />
            <PrivateRoute
              path={`/dashboard/favorites`}
              component={UserLiked}
              exact
            />
            <PrivateRoute path={`/dashboard`} component={PostsEdit} exact />

            <Route component={NotFound} />
          </Switch>
        </div>
        <ScrollButton />
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}
