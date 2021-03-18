import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  wrapper: {
    padding: "2rem",
  },
  button: {
    margin: "1rem",
    "&:hover": {
      color: "#FFF",
      opacity: 0.7,
    },
  },
});
export default function NotFound() {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.wrapper}>
        <Typography variant="h1">404 - Not Found!</Typography>
        <Typography variant="h6">
          Oops! Looks like something went wrong. Page either doesn't exist or
          you're not authorized to see it.
        </Typography>
        <Button
          to="/"
          component={Link}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Go Home
        </Button>
      </Paper>
    </Container>
  );
}
