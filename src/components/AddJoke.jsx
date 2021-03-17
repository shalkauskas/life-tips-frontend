import React, { useState } from "react";
import DataService from "../services/DataService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import { Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
const AddJoke = (props) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: props.showAdd ? green[300] : green[500],
      color: grey[50],
      "&:hover": {
        backgroundColor: green[300],
      },
    },
    textField: {
      backgroundColor: "#FFFFFF",
    },
    container: {
      textAlign: "center",
      marginTop: "1rem",
    },
  }));
  const classes = useStyles();
  const time = new Date().toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const initialJokeState = {
    id: null,
    content: "",
    published: false,
    author: "Anonymous",
    userId: "0",
    rating: "0",
    time: time,
  };
  const [joke, setJoke] = useState(initialJokeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJoke({ ...joke, [name]: value });
  };
  const saveJoke = () => {
    var data = {
      content: joke.content,
      author: props.author,
      userId: props.userId,
      time: time,
    };
    DataService.create(data)
      .then((response) => {
        setJoke({
          id: response.data.id,
          rating: response.data.rating,
          content: response.data.content,
          published: response.data.published,
          author: response.data.author,
          userId: response.data.userId,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newJoke = () => {
    setJoke(initialJokeState);
    setSubmitted(false);
  };

  return (
    <Container maxWidth="sm" disableGutters className={classes.container}>
      <Collapse in={submitted}>
        <Alert
          classes={{ icon: classes.message }}
          className={classes.alert}
          action={
            <Button color="inherit" size="small" onClick={newJoke}>
              Add another?
            </Button>
          }
        >
          You submitted successfully!
        </Alert>
      </Collapse>
      <Collapse in={!submitted}>
        <Container className={classes.container}>
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            rows={7}
            name="content"
            value={joke.content}
            onChange={handleInputChange}
            variant="outlined"
          />

          <Button
            variant="contained"
            size="large"
            className={classes.button}
            onClick={saveJoke}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={props.close}
          >
            Close
          </Button>
        </Container>
      </Collapse>
    </Container>
  );
};

export default AddJoke;
