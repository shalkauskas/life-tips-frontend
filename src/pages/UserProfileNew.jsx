import axios from "axios";
import React from "react";
import AuthService from "../services/AuthService";
import ConfirmationModalBackdrop from "../components/JokesEdit/ConfirmationModalBackdrop";
import UpdateConfirmation from "../components/UpdateConfirmation";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import { green, grey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  card: {
    width: "20rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatar: {
    width: "270px",
    height: "270px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    marginTop: "1rem",
  },
  button: {
    backgroundColor: green[500],
    color: grey[50],
    "&:hover": {
      backgroundColor: green[300],
    },
  },
});
export default function UserProfileNew(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [userpic, setUserpic] = React.useState("");
  const [activeButton, setActiveButton] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  React.useEffect(() => {
    props.userdata.displayName
      ? setName(props.userdata.displayName)
      : setName("");
    props.userdata.photoUrl
      ? setUserpic(props.userdata.photoUrl)
      : setUserpic("");
  }, [props.userdata.displayName, props.userdata.photoUrl]);
  const handleInputChange = (event) => {
    setActiveButton(true);
    setName(event.target.value);
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
          setShowConfirm(true);
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
    <Card className={classes.card}>
      <CardContent>
        <Avatar
          src={userpic}
          alt="user profile pic"
          className={classes.avatar}
          style={{ marginBottom: "1rem" }}
        >
          <AccountCircle className={classes.avatar} />
        </Avatar>
        <TextField
          className={classes.input}
          label="Name"
          value={name}
          name="displayName"
          id="displayName"
          onChange={handleInputChange}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          className={classes.input}
          id="email"
          value={props.userdata.username ? props.userdata.username : "email"}
          label="Email"
          style={{ margin: 8 }}
          helperText="Email update is not available at this moment"
          disabled
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <Button
          variant="contained"
          size="large"
          className={classes.button}
          onClick={updateUser}
          disabled={activeButton ? false : true}
        >
          Save
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={reset}
          disabled={activeButton ? false : true}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
}
