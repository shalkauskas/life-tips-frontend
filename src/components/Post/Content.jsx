import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
export default function PostContent(props) {
  return (
    <Container disableGutters style={{ marginTop: "1rem" }}>
      <Typography
        variant="h5"
        component="h2"
        style={{ marginBottom: "0.5rem" }}
      >
        {props.post.title}
      </Typography>
      <Typography variant="body1" component="p">
        {props.post.content}
      </Typography>
    </Container>
  );
}
