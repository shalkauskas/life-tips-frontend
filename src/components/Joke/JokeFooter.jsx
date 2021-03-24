import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import { green, red } from "@material-ui/core/colors";
import DataService from "../../services/DataService";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles({
  footer: {
    padding: "1rem",
  },
});
export default function JokeFooter(props) {
  const classes = useStyles();
  const updateRating = (modifier) => {
    const updateRatingAPI = (data) => {
      DataService.update(props.id || props.joke.id, data)
        .then((response) => {
          props.setJoke(response.data);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    if (modifier === props.jokeRatingCheck) {
      if (modifier === "up") {
        localStorage.setItem(props.joke.id, "");
        const data = {
          rating: props.joke.rating - 1,
        };
        updateRatingAPI(data);
      } else if (modifier === "down") {
        localStorage.setItem(props.joke.id, "");
        const data = {
          rating: props.joke.rating + 1,
        };
        updateRatingAPI(data);
      } else {
        // console.log("Already voted");
      }
    } else {
      if (props.jokeRatingCheck === "up") {
        localStorage.setItem(props.joke.id, "");
        const data = {
          rating: props.joke.rating - 1,
        };
        updateRatingAPI(data);
      } else if (props.jokeRatingCheck === "down") {
        localStorage.setItem(props.joke.id, "");
        const data = {
          rating: props.joke.rating + 1,
        };
        updateRatingAPI(data);
      } else {
        localStorage.setItem(props.joke.id, modifier);
        const data = {
          rating:
            modifier === "up"
              ? props.joke.rating + 1
              : "down"
              ? props.joke.rating - 1
              : props.joke.rating,
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
  return (
    <CardActions className={classes.footer}>
      <Grid container alignItems="center">
        <Grid item xs={7} sm={8} md={9}>
          {props.edit ? (
            <Tooltip title="Date added" placement="left">
              <Typography align="left" color="textSecondary">
                {props.joke.time}
              </Typography>
            </Tooltip>
          ) : (
            <Typography color="textSecondary">
              By {props.joke.author}
            </Typography>
          )}
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" className={classes.time}>
            <Grid item xs>
              {!props.edit && (
                <IconButton
                  aria-label="Like"
                  onClick={() => ratingHandler("up")}
                >
                  <ThumbUpIcon
                    style={{
                      color: props.jokeRatingCheck === "up" ? green[500] : "",
                    }}
                  />
                </IconButton>
              )}
            </Grid>
            <Grid item xs>
              <Tooltip title="Rating">
                <Typography
                  color="textSecondary"
                  align="center"
                  variant="subtitle1"
                >
                  [{props.joke.rating}]
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs>
              {!props.edit && (
                <IconButton
                  aria-label="Dislike"
                  onClick={() => ratingHandler("down")}
                >
                  <ThumbDownIcon
                    style={{
                      color: props.jokeRatingCheck === "down" ? red[900] : "",
                    }}
                  />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardActions>
  );
}
