import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useLocation } from "react-router-dom";
import DataService from "../services/DataService";
import PostHeader from "./Post/Header";
import PostContent from "./Post/Content";
import PostContentEdit from "./Post/ContentEdit";
import PostFooter from "./Post/Footer";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

export default function Post(props) {
  const classes = useStyles();
  const [post, setPost] = React.useState([]);
  const [editMode, setEditMode] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const postRatingCheck = localStorage.getItem(post.id);
  const location = useLocation();
  React.useEffect(() => {
    let mounted = true;
    const retrievePosts = (id) => {
      DataService.get(id)
        .then((response) => {
          if (mounted) setPost(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrievePosts(props.id || location.pathname.slice(6));
    return () => (mounted = false);
  }, [location, props.id, postRatingCheck]);
  const refreshList = () => {
    setShowDeleteConfirm(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowDeleteConfirm(false);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <PostHeader
            post={post}
            id={props.id}
            edit={props.edit}
            editMode={editMode}
            setEditMode={setEditMode}
            refreshList={refreshList}
          />

          {editMode ? (
            <PostContentEdit
              post={post}
              setEditMode={setEditMode}
              setMessage={props.setMessage}
            />
          ) : (
            <PostContent post={post} />
          )}
        </CardContent>
        <PostFooter
          post={post}
          setPost={setPost}
          postRatingCheck={postRatingCheck}
          id={props.id}
          edit={props.edit}
        />
      </Card>
      <Snackbar
        open={showDeleteConfirm}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Your post has been deleted!
        </Alert>
      </Snackbar>
    </>
  );
}
