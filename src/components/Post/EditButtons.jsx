import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteConfirmation from "../PostEdit/DeleteConfirmation";
const useStyles = makeStyles({
  buttonGroup: {
    textAlign: "end",
  },
  deleteButton: {
    "&:hover": { color: red[400] },
  },
  editButton: {
    "&:hover": { color: blue[500] },
  },
});
export default function PostEditButtons(props) {
  const classes = useStyles();
  const [showConfirm, setShowConfirm] = React.useState(false);
  return (
    <Container className={classes.buttonGroup}>
      <Tooltip title="Edit">
        <IconButton
          onClick={() => props.setEditMode(!props.editMode)}
          aria-label="edit"
          component="span"
          className={classes.editButton}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          onClick={() => setShowConfirm(true)}
          aria-label="delete"
          component="span"
          className={classes.deleteButton}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <DeleteConfirmation
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        postId={props.postId}
      />
    </Container>
  );
}
