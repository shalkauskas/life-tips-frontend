import axios from "axios";
import React from "react";
import AuthService from "../services/AuthService";
export default function UserProfile(props) {
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState(props.userdata.displayName);
  const [userpic, setUserpic] = React.useState(props.userdata.photoUrl);
  const [adminRole, setAdminRole] = React.useState(false);
  React.useEffect(() => {
    admin();
  }, []);
  const admin = () => {
    AuthService.admin().then((response) => {
      if (response.data.admin) {
        setAdminRole(true);
      } else {
        console.log(response);
      }
    });
  };
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
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", props.userdata.id);
    formData.append("upload_preset", "a4ol5pee");
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    if (file) {
      console.log(file);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/upload`,
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          setUserpic(fileURL);
          AuthService.updatePhoto({ photoUrl: fileURL }).then((response) => {
            console.log(response);
          });
          console.log(data);
        });
    }
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
          alert("Your profile has been successfully updated!");
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
          src={userpic || "/user.svg"}
          className="card-img-top rounded-circle w-50 mx-auto mt-3"
          alt="Profile user pic"
        />
        <div className="card-body text-center">
          {edit ? (
            <>
              <div className="custom-file mb-2">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  accept="image/*"
                  multiple={false}
                  onChange={handleImageUpload}
                />
                <label
                  className="custom-file-label text-left"
                  htmlFor="customFile"
                >
                  Upload new user pic
                </label>
              </div>
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
              </div>{" "}
            </>
          ) : (
            <h5 className="card-title mt-5">
              {props.userdata.displayName}
              {adminRole ? (
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
