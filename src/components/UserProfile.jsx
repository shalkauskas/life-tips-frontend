import React from "react";
import JokesEdit from "./JokesEdit";
import AuthService from "../services/AuthService";
export default function UserProfile(props) {
  const [adminRole, setAdminRole] = React.useState(false);
  React.useEffect(() => {
    admin();
  }, []);
  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };
  const admin = () => {
    AuthService.admin().then((response) => {
      if (response.data.admin) {
        setAdminRole(true);
      }
      console.log(response);
    });
  };
  return (
    <div className="d-flex flex-row-reverse">
      <div className="card ml-auto" style={{ width: "18rem", height: "25%" }}>
        <img
          src={"favicon.ico"}
          className="card-img-top rounded-circle w-50 mx-auto mt-3"
          alt="Profile user pic"
        />
        <div className="card-body text-center">
          <h5 className="card-title mt-5">
            {props.userdata.displayName}
            {adminRole ? (
              <span class="ml-2 badge badge-secondary">Admin</span>
            ) : null}
          </h5>
          <p className="card-text">{props.userdata.username}</p>
          <div className="d-flex flex-column w-50 mx-auto">
            <span onClick={logout} className="nav-link btn btn-danger">
              Logout
            </span>
          </div>
        </div>
      </div>
      <JokesEdit admin={adminRole} />
    </div>
  );
}
