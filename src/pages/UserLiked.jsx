import React, { useState, useEffect, useRef } from "react";
import AddPost from "../components/AddPost";
import Skeleton from "../components/Skeleton";
import LoadMoreButton from "../components/LoadMoreButton";
import Post from "../components/Post";
import DataService from "../services/DataService";
import { Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import amber from "@material-ui/core/colors/amber";
import { GlobalContext } from "../App";
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
export default function UserLiked() {
  const classes = useStyles();
  const ref = useRef();
  const [showAdd, setShowAdd] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state] = React.useContext(GlobalContext);
  const user = state.User.id;
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      await DataService.userLiked(user)
        .then((response) => {
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setPosts(response.data.posts);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchPosts();
  }, [user]);
  // infinite scroll auto fetch
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

  return (
    <section>
      <Container className={classes.header}>
        <Typography variant="h5">My favorites</Typography>
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
            <Post id={post.id} />
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
                You haven't liked any posts yet!
              </Typography>
            </Paper>
            <Collapse in={showAdd}>
              <AddPost close={() => setShowAdd(false)} />
            </Collapse>
          </div>
        )}
      </div>
    </section>
  );
}
