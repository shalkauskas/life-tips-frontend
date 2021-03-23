import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import JokeEditButtons from "../JokesEdit/JokeEditButtons";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  id: {
    color: green[400],
    fontSize: "16px",
  },
  time: {
    textAlign: "center",
  },
});
export default function JokeHeader(props) {
  const classes = useStyles();
  const jokeId = (props.id || window.location.pathname.slice(6)).replace(
    /\D/g,
    ""
  );
  const shareButton = () => {
    navigator.clipboard.writeText(
      window.location.href + `joke/${props.id || props.joke.id}`
    );
  };
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Button
          className={classes.id}
          color="secondary"
          to={{
            pathname: `/joke/${props.id || props.joke.id}`,
          }}
          component={Link}
        >
          <u>#{jokeId.slice(jokeId.length - 5)}</u>
        </Button>
        <Tooltip title="Copy link">
          <IconButton aria-label="Share" onClick={shareButton}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        {props.edit ? (
          <JokeEditButtons
            jokeId={props.joke.id}
            editMode={props.editMode}
            setEditMode={props.setEditMode}
            refreshList={props.refreshList}
          />
        ) : (
          <Typography align="right" color="textSecondary">
            {props.joke.time}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
