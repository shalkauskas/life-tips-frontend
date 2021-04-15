import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  commentContent: {
    padding: "1rem",
  },
  content: {},
}));
export default function CommentsPreview(props) {
  const classes = useStyles();
  const { content } = props;
  return (
    <Container className={classes.commentContent}>
      <Typography className={classes.content}>{content}</Typography>
    </Container>
  );
}
