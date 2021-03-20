import React from "react";
import UpdateConfirmation from "../components/UserProfile/UpdateConfirmation";
import UserPhoto from "../components/UserProfile/UserPhoto";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import UpdateButtons from "../components/UserProfile/UpdateButtons";
const useStyles = makeStyles({
  card: {
    width: "20rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    marginTop: "1rem",
  },
});
export default function UserProfile(props) {
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
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <UserPhoto
            userpic={userpic}
            setUserpic={setUserpic}
            setActiveButton={setActiveButton}
            userdataId={props.userdata.id}
          />
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
            helperText="Email update currently unavailable"
            disabled
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <UpdateButtons
            name={name}
            userpic={userpic}
            activeButton={activeButton}
            setName={setName}
            setShowConfirm={setShowConfirm}
            setUserpic={setUserpic}
            setActiveButton={setActiveButton}
          />
        </CardContent>
        <UpdateConfirmation
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
        />
      </Card>
    </>
  );
}
