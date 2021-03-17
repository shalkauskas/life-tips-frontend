import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { Link, useLocation } from "react-router-dom";
import DataService from "../services/DataService";
import Grid from "@material-ui/core/Grid";
import { green, red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  id: {
    color: green[400],
    fontSize: "16px",
  },
  time: {
    textAlign: "center",
  },
  footer: {
    padding: "1rem",
  },
});

export default function Joke(props) {
  const classes = useStyles();
  const [joke, setJoke] = React.useState([]);
  const jokeRatingCheck = localStorage.getItem(joke.id);
  const location = useLocation();
  React.useEffect(() => {
    let mounted = true;
    const retrieveJokes = (id) => {
      DataService.get(id)
        .then((response) => {
          if (mounted) setJoke(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveJokes(props.id || location.pathname.slice(6));
    return () => (mounted = false);
  }, [location, props.id, jokeRatingCheck]);

  const updateRating = (modifier) => {
    const updateRatingAPI = (data) => {
      DataService.update(props.id || joke.id, data)
        .then((response) => {
          setJoke(response.data);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    if (modifier === jokeRatingCheck) {
      if (modifier === "up") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating - 1,
        };
        updateRatingAPI(data);
      } else if (modifier === "down") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating + 1,
        };
        updateRatingAPI(data);
      } else {
        // console.log("Already voted");
      }
    } else {
      if (jokeRatingCheck === "up") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating - 1,
        };
        updateRatingAPI(data);
      } else if (jokeRatingCheck === "down") {
        localStorage.setItem(joke.id, "");
        const data = {
          rating: joke.rating + 1,
        };
        updateRatingAPI(data);
      } else {
        localStorage.setItem(joke.id, modifier);
        const data = {
          rating:
            modifier === "up"
              ? joke.rating + 1
              : "down"
              ? joke.rating - 1
              : joke.rating,
        };
        updateRatingAPI(data);
      }
    }
    // console.log(modifier, jokeRatingCheck);
  };
  const ratingHandler = (score) => {
    // props.isAuthenticated ?
    updateRating(score);
    // : alert("You must be logged in to rate posts!");
  };
  const jokeId = (props.id || window.location.pathname.slice(6)).replace(
    /\D/g,
    ""
  );
  const shareButton = () => {
    navigator.clipboard.writeText(
      window.location.href + `joke/${props.id || joke.id}`
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Button
              className={classes.id}
              color="secondary"
              to={{
                pathname: `/joke/${props.id || joke.id}`,
              }}
              component={Link}
            >
              <u>#{jokeId.slice(jokeId.length - 5)}</u>
            </Button>
            <Tooltip title="Copy link">
              <IconButton aria-label="Share" size="small" onClick={shareButton}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Typography align="right" color="textSecondary">
              {joke.time}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2">
          TITLE
        </Typography>
        <Typography variant="body1" component="p">
          {joke.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        <Grid container alignItems="center">
          <Grid item xs={7} sm={8} md={9}>
            <Typography color="textSecondary">By {joke.author}</Typography>
          </Grid>
          <Grid item xs>
            <Grid container alignItems="center" className={classes.time}>
              <Grid item xs>
                <IconButton
                  aria-label="Like"
                  onClick={() => ratingHandler("up")}
                >
                  <ThumbUpIcon
                    style={{
                      color: jokeRatingCheck === "up" ? green[500] : "",
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs>
                <Typography
                  color="textSecondary"
                  align="center"
                  variant="subtitle1"
                >
                  [{joke.rating}]
                </Typography>
              </Grid>
              <Grid item xs>
                <IconButton
                  aria-label="Dislike"
                  onClick={() => ratingHandler("down")}
                >
                  <ThumbDownIcon
                    style={{
                      color: jokeRatingCheck === "down" ? red[900] : "",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
