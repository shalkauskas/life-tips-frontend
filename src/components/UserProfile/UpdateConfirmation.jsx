import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { green, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
  button: {
    backgroundColor: green[500],
    color: grey[50],
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: green[300],
    },
  },
  icon: {
    color: green[500],
    fontSize: "5rem",
  },
});
export default function UpdateConfirmation(props) {
  const classes = useStyles();
  const onClose = () => {
    props.setShowConfirm(false);
    window.location.reload();
  };
  return (
    <div>
      <Dialog
        open={props.showConfirm}
        onClose={onClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title}>
          <CheckCircleIcon className={classes.icon} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your profile has been successfully updated!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            className={classes.button}
            variant="contained"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
