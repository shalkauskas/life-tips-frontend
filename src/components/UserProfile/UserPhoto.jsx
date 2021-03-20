import Container from "@material-ui/core/Container";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  avatar: {
    width: "285px",
    height: "285px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatarGroup: {
    position: "relative",
  },
  avatarLabelWrapper: {
    position: "absolute",
    display: "flex",
    color: "white",
    borderRadius: "9999px",
    bottom: "0",
    left: "0",
    top: "0",
    right: "0",
    opacity: "0.9",
    zIndex: "10",
    overflow: "hidden",
    "&:hover": {
      opacity: 0.75,
    },
  },
  avatarLabel: {
    textAlign: "center",
    marginBottom: 0,
    paddingBottom: "1rem",
    paddingTop: "0.5rem",
    alignSelf: "flex-end",
    width: "100%",
    cursor: "pointer",
    backgroundColor: grey[700],
    fontVariant: "petite-caps",
  },
});
export default function UserPhoto(props) {
  const classes = useStyles();
  const handleImageUpload = (e) => {
    props.setActiveButton(true);
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", props.userdataId);
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
          props.setUserpic(fileURL);
          console.log(data);
        });
    }
  };
  return (
    <Container className={classes.avatarGroup} disableGutters>
      <Avatar
        src={props.userpic}
        alt="user profile pic"
        className={classes.avatar}
        style={{ marginBottom: "1rem" }}
      >
        <AccountCircle className={classes.avatar} />
      </Avatar>
      <input
        type="file"
        style={{ display: "none" }}
        id="customFile"
        accept="image/*"
        multiple={false}
        onChange={handleImageUpload}
      />
      <div className={classes.avatarLabelWrapper}>
        <label className={classes.avatarLabel} htmlFor="customFile">
          Upload <AddAPhotoIcon />
        </label>
      </div>
    </Container>
  );
}
