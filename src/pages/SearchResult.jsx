import Post from "../components/Post";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import React from "react";
export default function SearchResult(props) {
  const searchState = props.location.state;
  return (
    <Container component="section">
      {searchState.result.length < 1 ? (
        <Paper style={{ padding: "2rem" }}>
          <Typography variant="h6" align="center">
            <SentimentVeryDissatisfiedIcon
              fontSize="large"
              style={{ verticalAlign: "middle" }}
            />
            <br />
            Sorry, there were no post results for “{searchState.query}”{" "}
          </Typography>
        </Paper>
      ) : (
        <>
          {searchState.result.map((post, index) => (
            <div key={index}>
              <Post id={post.id} />
            </div>
          ))}
        </>
      )}
    </Container>
  );
}
