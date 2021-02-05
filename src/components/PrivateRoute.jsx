import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/refreshToken";

const PrivateRoute = ({ component: Component, author, userId, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <Component {...props} {...rest} userId={userId} author={author} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
