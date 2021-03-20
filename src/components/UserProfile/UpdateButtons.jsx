import AuthService from "../../services/AuthService";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
const useStyles = makeStyles({
  buttonSave: {
    minWidth: "6.6rem",
    backgroundColor: green[500],
    color: grey[50],
    "&:hover": {
      backgroundColor: green[300],
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
  },
});
export default function UpdateButtons(props) {
  const classes = useStyles();
  const updateUser = () => {
    AuthService.updateUser({ displayName: props.name, photoUrl: props.userpic })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.setName(response.data.displayName);
          props.setShowConfirm(true);
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const reset = () => {
    props.setName(props.userdata.displayName);
    props.setUserpic(props.userdata.photoUrl);
    props.setActiveButton(false);
  };
  return (
    <Container className={classes.buttonGroup} disableGutters>
      <Button
        variant="contained"
        size="large"
        className={classes.buttonSave}
        onClick={updateUser}
        disabled={props.activeButton ? false : true}
      >
        Save
      </Button>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={reset}
        disabled={props.activeButton ? false : true}
      >
        Cancel
      </Button>
    </Container>
  );
}
