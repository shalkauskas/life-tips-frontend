import DataService from "../../services/DataService";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
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
export default function JokeEditButtons(props) {
  const classes = useStyles();
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
    <Container className={classes.buttonGroup}>
      <IconButton
        onClick={() => props.setEditMode(!props.editMode)}
        aria-label="edit"
        component="span"
        className={classes.editButton}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={deleteJoke}
        aria-label="delete"
        component="span"
        className={classes.deleteButton}
      >
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}
