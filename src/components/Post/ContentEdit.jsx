import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import DataService from "../../services/DataService";
import { RefreshContext } from "../../pages/MyContent";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  buttons: {
    textAlign: "center",
    position: "absolute",
    top: "-60px",
    left: "0",
    right: "0",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 600px)": {
      position: "initial",
      marginBottom: "1rem",
    },
  },
  saveButton: {
    backgroundColor: green[500],
    color: "#FFFFFF",
    minWidth: "7rem",
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: green[300],
    },
  },
}));
export default function PostContentEdit(props) {
  const classes = useStyles();
  const initialPostState = {
    id: props.post.id,
    title: props.post.title,
    content: props.post.content,
  };
  const [post, setPost] = React.useState(initialPostState);
  const [error, setError] = React.useState(false);
  const [editActive, setEditActive] = React.useState(false);
  const [, dispatch] = React.useContext(RefreshContext);
  const handleInputChange = (event) => {
    post.title.length > 1 && setError(false);
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
    setEditActive(true);
  };
  const reset = () => {
    setPost(initialPostState);
    props.setEditMode(false);
  };
  const updatePublished = (status) => {
    var data = {
      id: post.id,
      title: post.title,
      content: post.content,
    };
    post.title.length >= 1 &&
      DataService.update(props.post.id, data)
        .then((response) => {
          console.log(response.data);
          props.setEditMode(false);
          setPost({
            ...post,
            title: response.data.title,
            content: response.data.content,
          });
          dispatch({ type: "OnUpdate", payload: "updated" });
        })
        .catch((e) => {
          post.title.length < 1 ? setError(true) : alert(e);
        });
  };
  return (
    <Container disableGutters className={classes.wrapper}>
      <div className={classes.buttons}>
        <Button
          aria-label="Save"
          variant="contained"
          className={classes.saveButton}
          onClick={updatePublished}
          startIcon={<SaveIcon />}
          disabled={!editActive || error ? true : false}
        >
          Save
        </Button>
        <Button
          aria-label="Cancel"
          color="secondary"
          variant="outlined"
          onClick={reset}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </div>
      <TextField
        style={{ marginBottom: "1rem" }}
        id="title"
        name="title"
        label="Title"
        value={post.title}
        onChange={handleInputChange}
        variant="outlined"
        error={error}
        helperText={error ? "Title cannot be empty" : ""}
        multiline
        required
      />
      <TextField
        id="content"
        name="content"
        label="Content"
        value={post.content}
        onChange={handleInputChange}
        variant="outlined"
        multiline
      />
    </Container>
  );
}
