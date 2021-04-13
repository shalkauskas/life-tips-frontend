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
export default function PostFooter(props) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem(`user`));
  const isAuthenticated = JSON.parse(localStorage.getItem(`isAuthenticated`));
  const updateRating = (modifier) => {
    const updateRatingAPI = (data) => {
      DataService.update(props.id || props.post.id, data)
        .then((response) => {
          props.setPost(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const updateLikesAPI = (operator) => {
      const data = {
        likes: user.id,
        switch: operator,
      };
      DataService.update(props.id || props.post.id, data)
        .then((response) => {
          props.setPost(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    if (modifier === props.postRatingCheck) {
      if (modifier === "up") {
        localStorage.setItem(props.post.id, "");
        const data = {
          rating: props.post.rating - 1,
        };
        isAuthenticated && updateLikesAPI("remove");
        updateRatingAPI(data);
      } else if (modifier === "down") {
        localStorage.setItem(props.post.id, "");
        const data = {
          rating: props.post.rating + 1,
        };
        isAuthenticated && updateLikesAPI("add");
        updateRatingAPI(data);
      } else {
        // console.log("Already voted");
      }
    } else {
      if (props.postRatingCheck === "up") {
        localStorage.setItem(props.post.id, "");
        const data = {
          rating: props.post.rating - 1,
        };
        isAuthenticated && updateLikesAPI("remove");
        updateRatingAPI(data);
      } else if (props.postRatingCheck === "down") {
        localStorage.setItem(props.post.id, "");
        const data = {
          rating: props.post.rating + 1,
        };
        isAuthenticated && updateLikesAPI("add");
        updateRatingAPI(data);
      } else {
        localStorage.setItem(props.post.id, modifier);
        const data = {
          rating:
            modifier === "up"
              ? props.post.rating + 1
              : "down"
              ? props.post.rating - 1
              : props.post.rating,
        };
        const operator = modifier === "up" ? "add" : "down" ? "remove" : null;
        isAuthenticated && updateLikesAPI(operator);
        updateRatingAPI(data);
      }
    }
    // console.log(modifier, postRatingCheck);
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
                {props.post.time}
              </Typography>
            </Tooltip>
          ) : (
            <Typography color="textSecondary">
              By {props.post.author}
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
                      color: props.postRatingCheck === "up" ? green[500] : "",
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
                  [{props.post.rating}]
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
                      color: props.postRatingCheck === "down" ? red[900] : "",
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
