import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container jumbotron">
    <h1 className="display-4">404 - Not Found!</h1>
    <p className="lead">
      Oops! Looks like something went wrong. Page either doesn't exist or you're
      not authorized to see it.
    </p>
    <Link to="/" className="btn btn-primary btn-lg">
      Go Home
    </Link>
  </div>
);

export default NotFound;
