import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
export default function JokeContent(props) {
  return (
    <Container disableGutters style={{ marginTop: "1rem" }}>
      <Typography variant="h5" component="h2">
        {props.joke.title}
      </Typography>
      <Typography variant="body1" component="p">
        {props.joke.content}
      </Typography>
    </Container>
  );
}
