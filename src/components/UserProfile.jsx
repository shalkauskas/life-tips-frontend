import React from "react";
import AuthService from "../services/AuthService";
export default function UserProfile(props) {
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState(props.userdata.displayName);

  const logout = () => {
    AuthService.logout().then((response) => {
      window.location.reload();
      console.log(response);
    });
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const updateName = () => {
    var data = {
      displayName: name,
    };
    AuthService.updateName(data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setEdit(!edit);
          alert("Username successfully changed!");
          window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="bg-light py-5">
      <div
        className="card mb-4 flex-shrink-0 mx-auto"
        style={{ height: "fit-content", width: "18rem" }}
      >
        <img
          src="/favicon.ico"
          className="card-img-top rounded-circle w-50 mx-auto mt-3"
          alt="Profile user pic"
        />
        <div className="card-body text-center">
          {edit ? (
            <div className="input-group mb-2">
              <input
                value={name}
                type="text"
                name="displayName"
                className="form-control"
                onChange={handleInputChange}
              ></input>
              <div className="input-group-append">
                <button
                  onClick={updateName}
                  className="btn btn-success"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <h5 className="card-title mt-5">
              {props.userdata.displayName}
              {props.admin ? (
                <span className="ml-2 badge badge-secondary">Admin</span>
              ) : null}
            </h5>
          )}

          <p className="card-text">{props.userdata.username}</p>
          <div className="d-flex flex-column w-50 mx-auto">
            <span
              onClick={() => setEdit(!edit)}
              className="nav-link btn btn-warning mb-3"
            >
              {edit ? "Cancel" : "Edit"}
            </span>
            <span onClick={logout} className="nav-link btn btn-danger">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
