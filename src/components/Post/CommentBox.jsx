import DataService from "../../services/DataService";
import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Paper, Typography } from "@material-ui/core";
import { time } from "../../services/Time";
import CommentsContainer from "./Comments/CommentsContainer";
import { GlobalContext } from "../../App";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  commentBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "1rem",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  sendButton: {
    margin: "0.2rem 0.5rem",
    height: "2.5rem",
  },
  info: {
    padding: "1rem",
  },
  viewMoreLink: {
    textAlign: "center",
    padding: "0.5rem",
    fontWeight: "700",
  },
}));
export default function CommentBox(props) {
  const classes = useStyles();
  const location = useLocation();
  const [error, setError] = React.useState(false);
  const { id } = props;
  const initialCommentState = {
    userId: "",
    content: "",
    time: time,
  };
  const [comment, setComment] = React.useState(initialCommentState);
  const [comments, setComments] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [state] = React.useContext(GlobalContext);
  React.useEffect(() => {
    let mounted = true;
    async function fetch() {
      await DataService.getComments(id)
        .then((response) => {
          // console.log(response);
          // console.log(response.data.comments);
          if (mounted) {
            setComments(response.data.comments);
            setSubmitted(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetch();
    return () => (mounted = false);
  }, [id, submitted]);
  const handleInputChange = (event) => {
    comment.content.length > 1 && setError(false);
    comment.content.length >= 999 && setError(true);
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };
  const sendComment = () => {
    var data = {
      id: time,
      userId: "",
      content: comment.content,
      time: time,
    };
    DataService.addComment(id, data)
      .then((response) => {
        // console.log(response);
        setComments([...comments, comment]);
        setComment(initialCommentState);
        setSubmitted(true);
      })
      .catch((e) => {
        comment.content.length < 1 ? setError(true) : alert(e);
      });
  };
  const preview = location.pathname === `/post/${id}` ? false : true;
  return (
    <Paper elevation={3}>
      <Container className={classes.commentBox}>
        {/* post comments */}
        <Container className={classes.inputGroup} disableGutters>
          {state.User.isAuthenticated ? (
            <>
              <TextField
                fullWidth
                size="small"
                required
                multiline
                rowsMax={6}
                name="content"
                placeholder="Add a comment..."
                value={comment.content}
                onChange={handleInputChange}
                variant="outlined"
                error={error}
                inputProps={{ maxLength: 1000 }}
                helperText={
                  error && comment.content.length >= 998
                    ? "Max 1000 characters"
                    : error && "Title cannot be empty"
                }
              />
              <Button
                onClick={sendComment}
                variant="contained"
                color="primary"
                size="small"
                className={classes.sendButton}
              >
                Send
              </Button>
            </>
          ) : (
            <Typography className={classes.info}>
              You must be {""}
              <Link to="/login" component={RouterLink}>
                logged in
              </Link>
              {""} to leave comments
            </Typography>
          )}
        </Container>
        {/* view comments */}
        {comments.length >= 1 && (
          <CommentsContainer comments={comments} preview={preview} />
        )}
        {comments.length >= 2 && preview && (
          <Link
            to={`/post/${id}`}
            component={RouterLink}
            className={classes.viewMoreLink}
          >
            View more comments
          </Link>
        )}
      </Container>
    </Paper>
  );
}
