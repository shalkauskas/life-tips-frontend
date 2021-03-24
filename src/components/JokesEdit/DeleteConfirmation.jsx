import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { green, amber, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import DataService from "../../services/DataService";
const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
  button: {
    color: green[700],
    "&:hover": {
      backgroundColor: green[900],
      color: grey[50],
    },
  },
  buttonGroup: {
    justifyContent: "space-evenly",
    marginBottom: "1rem",
  },
  icon: {
    color: amber[700],
    fontSize: "5rem",
  },
});
export default function UpdateConfirmation(props) {
  const classes = useStyles();
  const removeAllJokes = () => {
    DataService.removeAll()
      .then((response) => {
        console.log(response.data);
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteJoke = () => {
    DataService.remove(props.jokeId)
      .then((response) => {
        console.log(response.data);
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Dialog
        open={props.showConfirm}
        onClose={() => props.setShowConfirm(false)}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title}>
          Are you sure you want to delete
          {props.deleteAll ? " all your published content?" : " this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="h6"
            color="secondary"
            id="alert-dialog-description"
            className={classes.title}
          >
            This action is non-reversible and all data will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.buttonGroup}>
          <Button
            onClick={props.deleteAll ? removeAllJokes : deleteJoke}
            variant="contained"
            color="secondary"
          >
            {props.deleteAll ? "Confirm delete all" : "Yes, delete"}
          </Button>
          <Button
            onClick={() => props.setShowConfirm(false)}
            variant="outlined"
            className={classes.button}
          >
            No, keep it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
