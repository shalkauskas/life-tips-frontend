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
import { GlobalContext } from "../App";
import { time } from "../services/Time";
export default function AddPost(props) {
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
  const initialPostState = {
    id: null,
    title: "",
    content: "",
    published: true,
    author: "Anonymous",
    userId: "0",
    rating: "0",
    time: time,
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [state] = React.useContext(GlobalContext);
  const handleInputChange = (event) => {
    post.title.length > 1 && setError(false);
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {
    var data = {
      title: post.title,
      content: post.content,
      published: post.published,
      author:
        state.User.isAuthenticated && !checked
          ? state.User.displayName
          : post.author,
      userId: state.User.isAuthenticated ? state.User.id : post.userId,
      time: time,
    };
    DataService.create(data)
      .then((response) => {
        setPost({
          id: response.data.id,
          rating: response.data.rating,
          title: response.data.title,
          content: response.data.content,
          published: response.data.published,
          author: response.data.author,
          userId: response.data.userId,
        });
        setSubmitted(true);
        props.setSubmitted(true);
      })
      .catch((e) => {
        post.title.length < 1 ? setError(true) : alert(e);
      });
  };

  const newPost = () => {
    setPost(initialPostState);
    setSubmitted(false);
  };

  return (
    <Container maxWidth="sm" disableGutters className={classes.container}>
      <Collapse in={submitted}>
        <Alert
          classes={{ icon: classes.message }}
          className={classes.alert}
          action={
            <Button color="inherit" size="small" onClick={newPost}>
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
            rows={3}
            name="title"
            label="Title"
            value={post.title}
            onChange={handleInputChange}
            variant="outlined"
            error={error}
            helperText={error ? "Title cannot be empty" : ""}
          />
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            rows={7}
            name="content"
            label="Text (Optional)"
            value={post.content}
            onChange={handleInputChange}
            variant="outlined"
          />
          <FormControlLabel
            style={{
              width: "100%",
              display: state.User.isAuthenticated ? "block" : "none",
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
            onClick={savePost}
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
}
