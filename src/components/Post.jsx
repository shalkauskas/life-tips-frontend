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
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  skeleton: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default function Post(props) {
  const { id, edit, setMessage } = props;
  const classes = useStyles();
  const [post, setPost] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const postRatingCheck = localStorage.getItem(post.id);
  const location = useLocation();
  React.useEffect(() => {
    let mounted = true;
    const retrievePosts = (id) => {
      setLoading(true);
      DataService.get(id)
        .then((response) => {
          if (mounted) setPost(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrievePosts(id || location.pathname.slice(6));
    return () => (mounted = false);
  }, [location, id, postRatingCheck]);
  const refreshList = () => {
    props.refreshList();
  };

  return (
    <>
      {loading ? (
        <Skeleton
          variant="rect"
          width={600}
          height={208}
          className={classes.skeleton}
        />
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <PostHeader
              post={post}
              id={id}
              edit={edit}
              editMode={editMode}
              setEditMode={setEditMode}
              refreshList={refreshList}
            />

            {editMode ? (
              <PostContentEdit
                post={post}
                setEditMode={setEditMode}
                setMessage={setMessage}
              />
            ) : (
              <PostContent post={post} />
            )}
          </CardContent>
          <PostFooter
            post={post}
            setPost={setPost}
            postRatingCheck={postRatingCheck}
            id={id}
            edit={edit}
          />
        </Card>
      )}
    </>
  );
}
