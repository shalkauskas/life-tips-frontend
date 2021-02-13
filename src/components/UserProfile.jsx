import { Link } from "react-router-dom";
import TutorialsEdit from "./TutorialsEdit";
import AuthService from "../services/AuthService";
export default function UserProfile(props) {
  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };
  return (
    <div className="d-flex flex-row-reverse">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <img
          src={"favicon.ico"}
          className="card-img-top rounded-circle w-50 mx-auto"
          alt="Profile user pic"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{props.userdata.displayName}</h5>
          <p className="card-text">{props.userdata.username}</p>
          <div className="d-flex flex-column w-50 mx-auto">
            <Link to={`/tutorials/update/`} className="btn btn-primary mb-4">
              My jokes
            </Link>
            <span onClick={logout} className="nav-link">
              Logout
            </span>
          </div>
        </div>
      </div>
      <div>
        <TutorialsEdit />
      </div>
    </div>
  );
}
