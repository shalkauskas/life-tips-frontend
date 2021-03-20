import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useLocation } from "react-router-dom";
import DataService from "../services/DataService";
import JokeHeader from "./Joke/JokeHeader";
import JokeContent from "./Joke/JokeContent";
import JokeFooter from "./Joke/JokeFooter";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
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

  return (
    <Card className={classes.root}>
      <CardContent>
        <JokeHeader joke={joke} id={props.id} edit={props.edit} />
        <JokeContent joke={joke} />
      </CardContent>
      <JokeFooter
        joke={joke}
        setJoke={setJoke}
        jokeRatingCheck={jokeRatingCheck}
        id={props.id}
        edit={props.edit}
      />
    </Card>
  );
}
