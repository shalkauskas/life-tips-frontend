import React from "react";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
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
  link: {
    color: grey[50],
  },
});
export default function About() {
  const classes = useStyles();
  return (
    <Container component="section">
      <Paper className={classes.wrapper}>
        <Typography variant="h2" gutterBottom>
          About this project
        </Typography>
        <Typography variant="h6">
          Life Pro Tips is a small platform based on popular subreddit
          <Link
            // className={classes.link}
            href="https://www.reddit.com/r/LifeProTips/"
            target="_blank"
            rel="noreferrer"
          >
            {""} r/LifeProTips/
          </Link>
          .{""} Feel free to share your own advice with the others!
          <br />
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          What is a Life Pro Tip?
        </Typography>
        <Typography variant="body1" component="blockquote">
          <blockquote cite="https://www.reddit.com/r/LifeProTips/">
            A Life Pro Tip (or an LPT) is a specific action with definitive
            results that improves life for you and those around you in a
            specific and significant way. Keep in mind that giving someone
            advice is not the same as giving someone an LPT. Advice is offering
            someone guidance or offering someone a recommendation.
          </blockquote>
        </Typography>
        <br />
        <Typography variant="body1">
          For demonstrational purposes some content is taken from the mentioned
          subreddit. If find any content offensive or rightfully yours and you
          want it to be removed, please contact me via links below.
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          <Link
            className={classes.link}
            href="mailto:igor.shalkauskas@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </Link>
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          <Link
            className={classes.link}
            href="https://shalkauskas.com"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </Link>
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          <Link
            className={classes.link}
            href="https://github.com/shalkauskas"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </Button>
      </Paper>
    </Container>
  );
}
