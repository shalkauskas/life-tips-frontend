import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import DataService from "../../services/DataService";
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
    top: "-64px",
    left: "0",
    right: "0",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
export default function JokeContentEdit(props) {
  const classes = useStyles();
  const initialJokeState = {
    id: props.joke.id,
    title: props.joke.title,
    content: props.joke.content,
  };
  const [joke, setJoke] = React.useState(initialJokeState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJoke({ ...joke, [name]: value });
  };
  const reset = () => {
    setJoke(initialJokeState);
  };
  const updatePublished = (status) => {
    var data = {
      id: joke.id,
      title: joke.title,
      content: joke.content,
    };
    DataService.update(props.joke.id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container disableGutters className={classes.wrapper}>
      <div className={classes.buttons}>
        <IconButton
          aria-label="Save"
          style={{ color: green[500] }}
          onClick={updatePublished}
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton aria-label="Cancel" color="secondary" onClick={reset}>
          <CancelIcon />
        </IconButton>
      </div>
      <TextField
        error={joke.title.length < 1 ? true : false}
        style={{ marginBottom: "1rem" }}
        id="title"
        name="title"
        label="Title"
        value={joke.title}
        onChange={handleInputChange}
        variant="outlined"
        helperText={joke.title.length < 1 ? "Title cannot be empty" : ""}
        multiline
      />
      <TextField
        id="content"
        name="content"
        label="Content"
        value={joke.content}
        onChange={handleInputChange}
        variant="outlined"
        multiline
      />
    </Container>
  );
}
