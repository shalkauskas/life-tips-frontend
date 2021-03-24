import React, { useState, useEffect, useRef } from "react";
import AuthService from "../services/AuthService";
import AddJoke from "../components/AddJoke";
import DeleteConfirmation from "../components/JokesEdit/DeleteConfirmation";
import SortButton from "../components/JokesEdit/SortButton";
import JokesEditAllButtons from "../components/JokesEdit/JokesEditAllButtons";
import Skeleton from "../components/Skeleton";
import LoadMoreButton from "../components/LoadMoreButton";
import AddButton from "../components/AddButton";
import Joke from "../components/Joke";
import DataService from "../services/DataService";
import { Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import amber from "@material-ui/core/colors/amber";
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
export default function JokesEdit() {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [adminRole, setAdminRole] = useState(false);
  const [jokes, setJokes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [page, setPage] = useState(0);
  const ref = useRef();
  const update = message.length > 1 ? true : false;
  useEffect(() => {
    AuthService.admin().then((response) => {
      if (response.data.admin) {
        setAdminRole(true);
      } else {
        console.log(response);
      }
    });
  }, []);
  useEffect(() => {
    async function fetchJokes() {
      setLoading(true);
      await DataService.getAll(page, "new")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setJokes((prevState) => [...prevState, ...response.data.jokes]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchJokes();
  }, [page]);
  useEffect(() => {
    async function fetchJokes() {
      setLoading(true);
      await DataService.getAll(0, "new")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setJokes([...response.data.jokes]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (update) {
      setJokes([]);
      fetchJokes();
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
  return (
    <div>
      <Container className={classes.header}>
        <Typography variant="h5">My content</Typography>
        <SortButton jokes={jokes} setJokes={setJokes} adminRole={adminRole} />
      </Container>
      <div
        style={{
          minWidth: 300,
          maxWidth: 650,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {jokes.map((joke, index) => (
          <div key={index}>
            <Joke
              content={joke.content}
              author={joke.author}
              id={joke.id}
              rating={joke.rating}
              time={joke.time}
              edit
            />
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
        {jokes.length < 1 ? (
          <div>
            <Paper elevation={3} className={classes.alert}>
              <Typography variant="h6">
                You don't have any added content yet. Want to submit a post?
              </Typography>

              <AddButton showAdd={showAdd} setShowAdd={setShowAdd} />
            </Paper>
            <Collapse in={showAdd}>
              <AddJoke close={() => setShowAdd(false)} />
            </Collapse>
          </div>
        ) : null}
      </div>
      <DeleteConfirmation
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        deleteAll
      />
      {/* <JokesEditAllButtons
        adminRole={adminRole}
        jokes={jokes}
        setShowConfirm={setShowConfirm}
        setMessage={setMessage}
      /> */}
    </div>
  );
}
