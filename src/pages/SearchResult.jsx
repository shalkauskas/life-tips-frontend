import PostsList from "../components/PostsList";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import React from "react";
export default function SearchResult(props) {
  return (
    <Container component="section">
      {props.location.state.result.length < 1 ? (
        <Paper style={{ padding: "2rem" }}>
          <Typography variant="h6" align="center">
            <SentimentVeryDissatisfiedIcon
              fontSize="large"
              style={{ verticalAlign: "middle" }}
            />
            <br />
            Sorry, there were no post results for “{
              props.location.state.query
            }”{" "}
          </Typography>
        </Paper>
      ) : (
        <PostsList posts={props.location.state.result} />
      )}
    </Container>
  );
}
