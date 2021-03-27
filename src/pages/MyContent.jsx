import React, { useState, useEffect, useRef } from "react";
// import AuthService from "../services/AuthService";
// import SortButton from "../components/PostsEdit/SortButton";
import AddPost from "../components/AddPost";
import DeleteConfirmation from "../components/PostEdit/DeleteConfirmation";
import Skeleton from "../components/Skeleton";
import LoadMoreButton from "../components/LoadMoreButton";
import AddButton from "../components/AddButton";
import Post from "../components/Post";
import DataService from "../services/DataService";
import { Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import amber from "@material-ui/core/colors/amber";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  alert: {
    textAlign: "center",
    backgroundColor: amber[300],
    padding: "1rem",
  },
}));
export default function PostsEdit() {
  const classes = useStyles();
  const ref = useRef();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // const [adminRole, setAdminRole] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(0);
  const update = message.length > 1 ? true : false;

  // useEffect(() => {
  //   AuthService.admin().then((response) => {
  //     if (response.data.admin) {
  //       setAdminRole(true);
  //     } else {
  //       console.log(response);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      await DataService.getAll(page, "new")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setPosts((prevState) => [...prevState, ...response.data.posts]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchPosts();
  }, [page]);
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      await DataService.getAll(0, "new")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setPosts([...response.data.posts]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (update) {
      setPosts([]);
      fetchPosts();
      setMessage("");
      setShowUpdateConfirm(true);
    }
  }, [update]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          setPage((prevValue) => prevValue + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    } else if (!hasNextPage) {
      observer.unobserve(ref.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, ref]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowUpdateConfirm(false);
  };
  return (
    <div>
      <Container className={classes.header}>
        <Typography variant="h5">My content</Typography>
        {/* <SortButton posts={posts} setPosts={setPosts} adminRole={adminRole} /> */}
      </Container>
      <div
        style={{
          minWidth: 300,
          maxWidth: 650,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {posts.map((post, index) => (
          <div key={index}>
            <Post id={post.id} setMessage={setMessage} edit />
          </div>
        ))}
        {loading && <Skeleton />}
        <div ref={ref} style={{ textAlign: "center", paddingBottom: "1rem" }}>
          <LoadMoreButton
            hasNextPage={hasNextPage}
            page={page}
            setPage={setPage}
          />
        </div>
        {posts.length < 1 && (
          <div>
            <Paper elevation={3} className={classes.alert}>
              <Typography variant="h6">
                You don't have any added content yet. Want to submit a post?
              </Typography>

              <AddButton showAdd={showAdd} setShowAdd={setShowAdd} />
            </Paper>
            <Collapse in={showAdd}>
              <AddPost close={() => setShowAdd(false)} />
            </Collapse>
          </div>
        )}
      </div>
      <DeleteConfirmation
        showConfirm={showDeleteConfirm}
        setShowConfirm={setShowDeleteConfirm}
        deleteAll
      />
      <Snackbar
        open={showUpdateConfirm}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Your post has been updated!
        </Alert>
      </Snackbar>
      {/* <PostsEditAllButtons
        adminRole={adminRole}
        posts={posts}
        setShowConfirm={setShowConfirm}
        setMessage={setMessage}
      /> */}
    </div>
  );
}
