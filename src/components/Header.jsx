import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import AuthService from "../services/AuthService";
export default function Header(props) {
  const [showSearch, setShowSearch] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);
  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };
  return (
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
          {props.isAuthenticated ? (
            <div className="dropdown">
              <button
                className={`my-auto d-inline btn dropdown-toggle`}
                onClick={() => setDropdown(!dropdown)}
              >
                <img
                  src={props.userdata.photoUrl || "/user.svg"}
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
                  {props.userdata.displayName}
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
  );
}
