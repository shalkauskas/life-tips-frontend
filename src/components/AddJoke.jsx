import React, { useState } from "react";
import DataService from "../services/DataService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import { Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab?Alert";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
      marginBottom: "1rem",
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
    title: "",
    content: "",
    published: true,
    author: "Anonymous",
    userId: "0",
    rating: "0",
    time: time,
  };
  const [joke, setJoke] = useState(initialJokeState);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJoke({ ...joke, [name]: value });
  };
  const user = JSON.parse(localStorage.getItem(`user`));
  const saveJoke = () => {
    var data = {
      title: joke.title,
      content: joke.content,
      published: joke.published,
      author: user && !checked ? user.displayName : joke.author,
      userId: user ? user.id : joke.userId,
      time: time,
    };
    DataService.create(data)
      .then((response) => {
        setJoke({
          id: response.data.id,
          rating: response.data.rating,
          title: response.data.title,
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
            required
            multiline
            rows={1}
            name="title"
            label="Title"
            value={joke.title}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            rows={7}
            name="content"
            label="Text (Optional)"
            value={joke.content}
            onChange={handleInputChange}
            variant="outlined"
          />
          <FormControlLabel
            style={{
              width: "100%",
              display: user ? "block" : "none",
            }}
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Send anonymous"
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
