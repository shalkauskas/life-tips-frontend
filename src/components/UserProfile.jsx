import axios from "axios";
import React from "react";
import AuthService from "../services/AuthService";
export default function UserProfile(props) {
  const [name, setName] = React.useState(props.userdata.displayName);
  const [userpic, setUserpic] = React.useState(props.userdata.photoUrl);
  const [activeButton, setActiveButton] = React.useState(false);
  const handleInputChange = (event) => {
    setActiveButton(true);
    setName(event.target.value);
    console.log(name);
  };
  const handleImageUpload = (e) => {
    setActiveButton(true);
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
          console.log(data);
        });
    }
  };
  const updateUser = () => {
    AuthService.updateUser({ displayName: name, photoUrl: userpic })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setName(response.data.displayName);
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
  const reset = () => {
    setName(props.userdata.displayName);
    setUserpic(props.userdata.photoUrl);
    setActiveButton(false);
  };
  return (
    <div className="bg-light py-5">
      <div
        className="card mb-4 flex-shrink-0 mx-auto"
        style={{ height: "fit-content", width: "18rem" }}
      >
        <div className="card-body text-center">
          {/* image */}
          <div className="upload-new mb-2 position-relative">
            <input
              type="file"
              className="d-none"
              id="customFile"
              accept="image/*"
              multiple={false}
              onChange={handleImageUpload}
            />
            <img
              src={userpic || "/user.svg"}
              className="card-img-top rounded-circle d-block mx-auto mt-3 "
              alt="Profile user pic"
            />
            <div
              className=" position-absolute text-white rounded-circle d-flex"
              style={{
                bottom: "0",
                left: "0",
                top: "0",
                right: "0",
                opacity: "0.9",
                zIndex: "10",
                overflow: "hidden",
              }}
            >
              <label
                className="text-center mb-0 pb-3 pt-2 bg-secondary align-self-end w-100 upload"
                htmlFor="customFile"
                style={{ cursor: "pointer" }}
              >
                Upload{" "}
                <img
                  src="/edit.svg"
                  alt="Upload new"
                  width="20px"
                  className="ml-2 align-text-top"
                  style={{
                    filter:
                      "invert(100%) sepia(3%) saturate(13%) hue-rotate(81deg) brightness(106%) contrast(106%)",
                  }}
                />
              </label>
            </div>
          </div>
          {/*  */}
          <div className="input-group mb-2">
            <input
              value={name}
              type="text"
              name="displayName"
              className="form-control"
              onChange={handleInputChange}
            ></input>
          </div>{" "}
          <p className="card-text">{props.userdata.username}</p>
          <div className="d-flex flex-column w-50 mx-auto">
            <button
              onClick={updateUser}
              className={`${
                activeButton ? "" : "disabled"
              } nav-link btn btn-success mb-3`}
            >
              Save
            </button>
            <span
              className={`${
                activeButton ? "" : "disabled"
              } nav-link btn btn-warning`}
              onClick={reset}
            >
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
