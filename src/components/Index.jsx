import { Switch, Route, Link } from "react-router-dom";
import Logout from "./Logout";
import { isLogin } from "../utils/refreshToken";
import AddTutorial from "./AddTutorial";
import Tutorial from "./Tutorial";
import TutorialsList from "./TutorialsList";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
export default function Index() {
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
      <div>
        <h1 className="text-center">Welcome to Web Development Tutorials</h1>
      </div>

      <div className="container mt-3">
        <Switch>
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
