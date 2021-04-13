import React from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../App";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = React.useContext(GlobalContext);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        state.User.isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
