import React, { useState, useEffect, useRef, createContext } from "react";
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
// import { RefreshContext } from "../services/RefreshContext";

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
    backgroundColor: amber[200],
    padding: "1rem",
  },
}));
export const RefreshContext = createContext();
export default function PostsEdit() {
  const classes = useStyles();
  const ref = useRef();
  // context
  const updateState = {
    refresh: false,
    message: "",
  };
  const [update, setUpdate] = useState(updateState);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  // const [adminRole, setAdminRole] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(0);
  console.log(update);
  // reducer
  const reduce = (state, action) => {
    switch (action.type) {
      case "OnSuccess":
        return {
          loading: false,
          posts: action.payload,
          error: "",
        };
      case "OnFailure":
        return {
          loading: false,
          posts: {},
          error: "Something went wrong",
        };
      case "OnUpdate":
        return initialState;

      default:
        return state;
    }
  };
  const initialState = {
    posts: [],
    loading: true,
    error: "",
  };
  const [state, dispatch] = React.useReducer(reduce, initialState);
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
      await DataService.getAll(page, "new")
        .then((response) => {
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          dispatch({ type: "OnSuccess", payload: response.data.posts });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: "OnFailure" });
        });
    }
    const reset = () => {
      dispatch({ type: "OnUpdate" });
      // setUpdate((prevState) => ({ ...prevState, refresh: false }));
      update.message === "Saved"
        ? setShowUpdateConfirm(true)
        : update.message === "Deleted"
        ? setShowDeleteAlert(true)
        : console.log("Error");
      fetchPosts();
    };
    update ? reset() : fetchPosts();
  }, [page, update]);
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
    setShowDeleteAlert(false);
    // setUpdate(updateState);
  };

  return (
    <div>
      <RefreshContext.Provider value={[update, setUpdate]}>
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
          {state.posts.map((post, index) => (
            <div key={index}>
              <Post id={post.id} edit />
            </div>
          ))}
          {state.loading && <Skeleton />}
          <div ref={ref} style={{ textAlign: "center", paddingBottom: "1rem" }}>
            <LoadMoreButton
              hasNextPage={hasNextPage}
              page={page}
              setPage={setPage}
            />
          </div>
          {state.posts.length < 1 && (
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
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Your post has been updated!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showDeleteAlert}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Your post has been deleted!
          </Alert>
        </Snackbar>
        {/* --------- Edit all buttons -------- */}
        {/* <PostsEditAllButtons
        adminRole={adminRole}
        posts={posts}
        setShowConfirm={setShowConfirm}
        setMessage={setMessage}
      /> */}
      </RefreshContext.Provider>
    </div>
  );
}
