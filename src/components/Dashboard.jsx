import React from "react";
import JokesEdit from "./JokesEdit";
import AuthService from "../services/AuthService";
import UserProfile from "./UserProfile";
export default function Dashboard(props) {
  const [adminRole, setAdminRole] = React.useState(false);
  const [editTab, setEditTab] = React.useState(true);
  React.useEffect(() => {
    admin();
  }, []);
  const admin = () => {
    AuthService.admin().then((response) => {
      if (response.data.admin) {
        setAdminRole(true);
      }
      console.log(response);
    });
  };
  return (
    <div>
      <ul className="nav nav-tabs justify-content-center ">
        <li className="nav-item">
          <button
            className={`nav-link ${editTab ? "active bg-light" : ""}`}
            onClick={() => setEditTab(true)}
          >
            Content
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${editTab ? "" : "active bg-light"}`}
            onClick={() => setEditTab(false)}
          >
            Profile
          </button>
        </li>
      </ul>
      {editTab ? (
        <JokesEdit admin={adminRole} jokes={props.jokes} />
      ) : (
        <UserProfile admin={adminRole} userdata={props.userdata} />
      )}
    </div>
  );
}
